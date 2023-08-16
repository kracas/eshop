import { medusaClient } from "@lib/config"
import useToggleState, { StateType } from "@lib/hooks/use-toggle-state"
import {
  Address,
  Cart,
  Customer,
  StorePostCartsCartReq,
  Order
} from "@medusajs/medusa"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import { isEqual } from "lodash"
import {
  formatAmount,
  useCart,
  useCartShippingOptions,
  useMeCustomer,
  useRegions,
  useSetPaymentSession,
  useUpdateCart,
} from "medusa-react"
import { useRouter } from "next/router"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useStore } from "./store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { sendGtmEcommerceEvent, getGtmItems } from "@lib/util/googleTagManager"

type AddressValues = {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  province: string
  postal_code: string
  country_code: string
  phone: string
}

export type CheckoutFormValues = {
  shipping_address: AddressValues
  billing_address: AddressValues
  email: string
}

interface CheckoutContext {
  cart?: Omit<Cart, "refundable_amount" | "refunded_total">
  shippingMethods: { label: string | undefined; value: string | undefined; price: string }[]
  isLoading: boolean
  readyToComplete: boolean
  sameAsBilling: StateType
  editAddresses: StateType
  initPayment: () => Promise<void>
  setAddresses: (addresses: CheckoutFormValues) => void
  setSavedAddress: (address: Address) => void
  setShippingOption: (soId: string) => void
  setPaymentSession: (providerId: string) => void
  onPaymentCompleted: (cartId?: Cart["id"]) => void
  setManualLoader: (isLoading: boolean) => void
}

const CheckoutContext = createContext<CheckoutContext | null>(null)

interface CheckoutProviderProps {
  children?: React.ReactNode
}

const IDEMPOTENCY_KEY = "create_payment_session_key"

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const {
    cart,
    setCart,
    addShippingMethod: {
      mutate: setShippingMethod,
      isLoading: addingShippingMethod,
    },
    completeCheckout: { mutate: complete, isLoading: completingCheckout },
  } = useCart()

  const [isManualLoader, setManualLoader] = useState(false)

  const enrichedItems = useEnrichedLineItems()

  useEffect(() => {
    //send begin checkout once
    if (enrichedItems && enrichedItems.length) {
      const items = getGtmItems(enrichedItems)
      sendGtmEcommerceEvent('begin_checkout', {
        value: cart?.subtotal ? cart.subtotal / 100 : 0,
        currency: cart?.region.currency_code.toUpperCase(),
        items: items,
        user_data: {
          email: cart?.email,
          address: {
            city: cart?.shipping_address?.city,
            first_name: cart?.shipping_address?.first_name,
            last_name: cart?.shipping_address?.last_name,
            postal_code: cart?.shipping_address?.postal_code,
            region: cart?.shipping_address?.province,
            country: cart?.shipping_address?.country_code,
            phone_number: cart?.shipping_address?.phone,
          }
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { customer } = useMeCustomer()
  const { countryCode } = useStore()

  const methods = useForm<CheckoutFormValues>({
    defaultValues: mapFormValues(customer, cart, countryCode),
    reValidateMode: "onChange",
  })

  const {
    mutate: setPaymentSessionMutation,
    isLoading: settingPaymentSession,
  } = useSetPaymentSession(cart?.id!)

  const { mutate: updateCart, isLoading: updatingCart } = useUpdateCart(
    cart?.id!
  )

  const { shipping_options } = useCartShippingOptions(cart?.id!, {
    enabled: !!cart?.id,
  })

  const { regions } = useRegions()

  const { resetCart, setRegion } = useStore()
  const { push } = useRouter()

  const editAddresses = useToggleState()
  const sameAsBilling = useToggleState(
    cart?.billing_address && cart?.shipping_address
      ? isEqual(cart.billing_address, cart.shipping_address)
      : true
  )

  /**
   * Boolean that indicates if a part of the checkout is loading.
   */
  const isLoading = useMemo(() => {
    return (
      addingShippingMethod ||
      settingPaymentSession ||
      updatingCart ||
      completingCheckout ||
      isManualLoader
    )
  }, [
    addingShippingMethod,
    completingCheckout,
    settingPaymentSession,
    updatingCart,
    isManualLoader,
  ])

  /**
   * Boolean that indicates if the checkout is ready to be completed. A checkout is ready to be completed if
   * the user has supplied a email, shipping address, billing address, shipping method, and a method of payment.
   */
  const readyToComplete = useMemo(() => {
    return (
      !!cart &&
      !!cart.email &&
      !!cart.shipping_address &&
      !!cart.billing_address &&
      !!cart.payment_session &&
      cart.shipping_methods?.length > 0
    )
  }, [cart])

  const shippingMethods = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }))
    }

    return []
  }, [shipping_options, cart])

  /**
   * Resets the form when the cart changed.
   */
  useEffect(() => {
    if (cart?.id) {
      methods.reset(mapFormValues(customer, cart, countryCode))
    }
  }, [customer, cart, methods, countryCode])

  useEffect(() => {
    if (!cart) {
      editAddresses.open()
      return
    }

    if (cart?.shipping_address && cart?.billing_address) {
      editAddresses.close()
      return
    }

    editAddresses.open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  /**
   * Method to set the selected shipping method for the cart. This is called when the user selects a shipping method, such as UPS, FedEx, etc.
   */
  const setShippingOption = (soId: string) => {
    if (cart) {
      setShippingMethod(
        { option_id: soId },
        {
          onSuccess: ({ cart }) => setCart(cart),
        }
      )
    }
  }

  /**
   * Method to create the payment sessions available for the cart. Uses a idempotency key to prevent duplicate requests.
   */
  const createPaymentSession = async (cartId: string) => {
    return medusaClient.carts
      .createPaymentSessions(cartId, {
        "Idempotency-Key": IDEMPOTENCY_KEY,
      })
      .then(({ cart }) => cart)
      .catch(() => null)
  }

  /**
   * Method that calls the createPaymentSession method and updates the cart with the payment session.
   */
  const initPayment = async () => {
    if (cart?.id && !cart.payment_sessions?.length && cart?.items?.length) {
      const paymentSession = await createPaymentSession(cart.id)

      if (!paymentSession) {
        setTimeout(initPayment, 500)
      } else {
        setCart(paymentSession)
        return
      }
    }
  }

  /**
   * Method to set the selected payment session for the cart. This is called when the user selects a payment provider, such as Stripe, PayPal, etc.
   */
  const setPaymentSession = (providerId: string) => {
    if (cart) {
      setPaymentSessionMutation(
        {
          provider_id: providerId,
        },
        {
          onSuccess: ({ cart }) => {
            setCart(cart)
          },
        }
      )
    }
  }

  //update payment session when cart total changes
  useEffect(() => {
    if (cart?.payment_session) {
      setPaymentSession(cart.payment_session.provider_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.total])

  const prepareFinalSteps = () => {
    initPayment()

    if (shippingMethods && shippingMethods[0].value) {
      setShippingOption(shippingMethods[0].value)
    }
  }

  const setSavedAddress = (address: Address) => {
    const setValue = methods.setValue

    setValue("shipping_address", {
      address_1: address.address_1 || "",
      address_2: address.address_2 || "",
      city: address.city || "",
      country_code: address.country_code || "",
      first_name: address.first_name || "",
      last_name: address.last_name || "",
      phone: address.phone || "",
      postal_code: address.postal_code || "",
      province: address.province || "",
      company: address.company || "",
    })
  }

  /**
   * Method that validates if the cart's region matches the shipping address's region. If not, it will update the cart region.
   */
  const validateRegion = async (countryCode: string) => {
    if (regions && cart) {
      const region = regions.find((r) =>
        r.countries.map((c) => c.iso_2).includes(countryCode)
      )

      if (region && region.id !== cart.region.id) {
        await setRegion(region.id, countryCode)
      }
    }
  }

  /**
   * Method that sets the addresses and email on the cart.
   */
  const setAddresses = (data: CheckoutFormValues) => {
    const { shipping_address, billing_address, email } = data

    validateRegion(shipping_address.country_code).then(() => {
      const payload: StorePostCartsCartReq = {
        shipping_address,
        email,
      }

      if (isEqual(shipping_address, billing_address)) {
        sameAsBilling.open()
      }

      if (sameAsBilling.state) {
        payload.billing_address = shipping_address
      } else {
        payload.billing_address = billing_address
      }

      updateCart(payload, {
        onSuccess: ({ cart }) => {
          setCart(cart)
          prepareFinalSteps()
        },
      })
    })
  }

  /**
   * Method to complete the checkout process. This is called when the user clicks the "Complete Checkout" button.
   */
  const onPaymentCompleted = (cartId?: Cart["id"]) => {
    const sendGtmPurchase = (order: Order) => {
      if (enrichedItems) {
        const gtmItems = getGtmItems(enrichedItems)
        sendGtmEcommerceEvent('purchase', {
          transaction_id: order.id,
          value: order.subtotal / 100,
          currency: order.region.currency_code.toUpperCase(),
          shipping: order.shipping_total / 100,
          items: gtmItems,
          user_data: {
            email: order.email,
            address: {
              city: order.shipping_address.city,
              first_name: order.shipping_address.first_name,
              last_name: order.shipping_address.last_name,
              postal_code: order.shipping_address.postal_code,
              region: order.shipping_address.province,
              country: order.shipping_address.country_code,
              phone_number: order.shipping_address.phone,
            }
          }
        })
      }
    }

    if (cartId) {
      const redirectToOrder = async () => {
        const { order } = await medusaClient.orders.retrieveByCartId(cartId)
        sendGtmPurchase(order)
        push(`/order/confirmed/${order.id}`)
      }

      return redirectToOrder()
    }

    complete(undefined, {
      onSuccess: ({ type, data }) => {
        if (type === 'order') {
          sendGtmPurchase(data)
        }
        resetCart()
        push(`/order/confirmed/${data.id}`)
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <CheckoutContext.Provider
        value={{
          cart,
          shippingMethods,
          isLoading,
          readyToComplete,
          sameAsBilling,
          editAddresses,
          initPayment,
          setAddresses,
          setSavedAddress,
          setShippingOption,
          setPaymentSession,
          onPaymentCompleted,
          setManualLoader,
        }}
      >
        <Wrapper paymentSession={cart?.payment_session}>{children}</Wrapper>
      </CheckoutContext.Provider>
    </FormProvider>
  )
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  const form = useFormContext<CheckoutFormValues>()
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider"
    )
  }
  return { ...context, ...form }
}

/**
 * Method to map the fields of a potential customer and the cart to the checkout form values. Information is assigned with the following priority:
 * 1. Cart information
 * 2. Customer information
 * 3. Default values - null
 */
const mapFormValues = (
  customer?: Omit<Customer, "password_hash">,
  cart?: Omit<Cart, "refundable_amount" | "refunded_total">,
  currentCountry?: string
): CheckoutFormValues => {
  const customerShippingAddress = customer?.shipping_addresses?.[0]
  const customerBillingAddress = customer?.billing_address

  return {
    shipping_address: {
      first_name:
        cart?.shipping_address?.first_name ||
        customerShippingAddress?.first_name ||
        "",
      last_name:
        cart?.shipping_address?.last_name ||
        customerShippingAddress?.last_name ||
        "",
      address_1:
        cart?.shipping_address?.address_1 ||
        customerShippingAddress?.address_1 ||
        "",
      address_2:
        cart?.shipping_address?.address_2 ||
        customerShippingAddress?.address_2 ||
        "",
      city: cart?.shipping_address?.city || customerShippingAddress?.city || "",
      country_code:
        currentCountry ||
        cart?.shipping_address?.country_code ||
        customerShippingAddress?.country_code ||
        "",
      province:
        cart?.shipping_address?.province ||
        customerShippingAddress?.province ||
        "",
      company:
        cart?.shipping_address?.company ||
        customerShippingAddress?.company ||
        "",
      postal_code:
        cart?.shipping_address?.postal_code ||
        customerShippingAddress?.postal_code ||
        "",
      phone:
        cart?.shipping_address?.phone || customerShippingAddress?.phone || "",
    },
    billing_address: {
      first_name:
        cart?.billing_address?.first_name ||
        customerBillingAddress?.first_name ||
        "",
      last_name:
        cart?.billing_address?.last_name ||
        customerBillingAddress?.last_name ||
        "",
      address_1:
        cart?.billing_address?.address_1 ||
        customerBillingAddress?.address_1 ||
        "",
      address_2:
        cart?.billing_address?.address_2 ||
        customerBillingAddress?.address_2 ||
        "",
      city: cart?.billing_address?.city || customerBillingAddress?.city || "",
      country_code:
        cart?.shipping_address?.country_code ||
        customerBillingAddress?.country_code ||
        "",
      province:
        cart?.shipping_address?.province ||
        customerBillingAddress?.province ||
        "",
      company:
        cart?.billing_address?.company || customerBillingAddress?.company || "",
      postal_code:
        cart?.billing_address?.postal_code ||
        customerBillingAddress?.postal_code ||
        "",
      phone:
        cart?.billing_address?.phone || customerBillingAddress?.phone || "",
    },
    email: cart?.email || customer?.email || "",
  }
}
