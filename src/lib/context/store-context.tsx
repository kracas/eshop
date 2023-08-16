import { medusaClient } from "@lib/config"
import { handleError } from "@lib/util/handle-error"
import { Region } from "@medusajs/medusa"
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
} from "medusa-react"
import React, { useEffect, useState, useReducer } from "react"
import { useCartDropdown } from "./cart-dropdown-context"
import useEnrichedLineItems, { EnrichedLineItem } from "@lib/hooks/use-enrich-line-items"
import { CalculatedVariant } from "types/medusa"
import { nanoid } from 'nanoid'
import { sendGtmEcommerceEvent, getGtmItems } from "@lib/util/googleTagManager"
import useCountryOptions from "@lib/hooks/use-country-options"
import { useRouter } from "next/router"

interface VariantInfoProps {
  variantId: string
  quantity: number
}

interface LineInfoProps {
  lineId: string
  quantity: number
}

interface StoreContext {
  countryCode: string | undefined
  setRegion: (regionId: string, countryCode: string) => Promise<void>
  addItem: (item: VariantInfoProps) => void
  updateItem: (item: LineInfoProps) => void
  deleteItem: (lineId: string) => void
  resetCart: () => void
}

const StoreContext = React.createContext<StoreContext | null>(null)

export const useStore = () => {
  const context = React.useContext(StoreContext)
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

interface StoreProps {
  children: React.ReactNode
}
type GtmEvent = { id: string, quantity: number, } &
  ({ eventType: "add" | "update", prevLineItem?: undefined } |
  { eventType: "add" | "update" | "delete", prevLineItem: EnrichedLineItem }) &
  (
    { lineId: string, variantId?: undefined } |
    { variantId: string, lineId?: undefined }
  )

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"
const REGION_KEY = "medusa_region"

export const StoreProvider = ({ children }: StoreProps) => {
  const { cart, setCart, createCart, updateCart } = useCart()
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
  const [gtmEvents, setGtmEvents] = useReducer((state: GtmEvent[], action: { action: 'add' | 'remove', event: GtmEvent }) => {
    if (action.action === 'add') {
      return [...state, action.event]
    }
    if (action.action === 'remove') {
      return state.filter((e) => e.id !== action.event.id)
    }
    return state
  }, [])
  const { timedOpen } = useCartDropdown()
  const addLineItem = useCreateLineItem(cart?.id!)
  const removeLineItem = useDeleteLineItem(cart?.id!)
  const adjustLineItem = useUpdateLineItem(cart?.id!)
  const enrichedItems = useEnrichedLineItems()
  const countries = useCountryOptions()
  const router = useRouter()

  useEffect(() => {
    if (cart?.id) {
      const handleRouteChange = (url: string) => {
        gtag('event', 'page_view', {
          page_location: window.location.href,
          page_path: url,
          page_title: document.title,
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
      router.events.on("routeChangeComplete", handleRouteChange)
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.id])

  const storeRegion = (regionId: string, countryCode: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(
        REGION_KEY,
        JSON.stringify({ regionId, countryCode })
      )

      setCountryCode(countryCode)
    }
  }

  useEffect(() => {
    if (!IS_SERVER) {
      const storedRegion = localStorage.getItem(REGION_KEY)
      if (storedRegion) {
        const { countryCode } = JSON.parse(storedRegion)
        setCountryCode(countryCode)
      }
    }
  }, [])

  const getRegion = () => {
    if (!IS_SERVER) {
      const region = localStorage.getItem(REGION_KEY)
      if (region) {
        return JSON.parse(region) as { regionId: string; countryCode: string }
      }
    }
    return null
  }

  const setRegion = async (regionId: string, countryCode: string) => {
    await updateCart.mutateAsync(
      {
        region_id: regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          storeRegion(regionId, countryCode)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const ensureRegion = (region: Region, countryCode?: string | null) => {
    if (!IS_SERVER) {
      const { regionId, countryCode: defaultCountryCode } = getRegion() || {
        regionId: region.id,
        countryCode: region.countries[0].iso_2,
      }

      const finalCountryCode = countryCode || defaultCountryCode

      if (regionId !== region.id) {
        setRegion(region.id, finalCountryCode)
      }

      storeRegion(region.id, finalCountryCode)
      setCountryCode(finalCountryCode)
    }
  }

  const storeCart = (id: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(CART_KEY, id)
    }
  }

  const getCart = () => {
    if (!IS_SERVER) {
      return localStorage.getItem(CART_KEY)
    }
    return null
  }

  const deleteCart = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(CART_KEY)
    }
  }

  const deleteRegion = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(REGION_KEY)
    }
  }

  const createNewCart = async (regionId?: string, countryCodeCart?: string) => {
    await createCart.mutateAsync(
      {
        region_id: regionId,
        country_code: countryCodeCart
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region, cart.shipping_address?.country_code)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const resetCart = () => {
    deleteCart()

    const savedRegion = getRegion()

    createCart.mutate(
      {
        region_id: savedRegion?.regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region, cart.shipping_address?.country_code)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  useEffect(() => {
    const ensureCart = async () => {
      const cartId = getCart()
      const region = getRegion()

      if (cartId) {
        const cartRes = await medusaClient.carts
          .retrieve(cartId)
          .then(({ cart }) => {
            return cart
          })
          .catch(async (_) => {
            return null
          })

        if (!cartRes || cartRes.completed_at) {
          deleteCart()
          deleteRegion()
          await createNewCart(region?.regionId, region?.countryCode)
          return
        }

        setCart(cartRes)
        ensureRegion(cartRes.region)
      } else {
        let countryCodeCart = region?.countryCode
        let regionId = region?.regionId
        if (!countryCodeCart) {
          const data = await fetch("https://ipapi.co/json/");
          const { country_code } = await data.json();
          if (country_code) {
            const country = countries?.find((c) => c.country === country_code.toLowerCase())
            if (country) {
              countryCodeCart = country.country
              regionId = country.region
            }
          }
        }
        await createNewCart(regionId, countryCodeCart);
      }
    }

    if (!IS_SERVER && !cart?.id && countries) {
      ensureCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries])

  useEffect(() => {
    if (!gtmEvents.length) return

    const sendGtmEvent = async (gtmEvent: GtmEvent) => {
      const { eventType, lineId, variantId, quantity, prevLineItem } = gtmEvent
      const removeEvent = () => setGtmEvents({ action: 'remove', event: gtmEvent })

      let eventName: Gtag.EventNames | undefined
      if (eventType === "add") {
        eventName = "add_to_cart"
      }
      if (eventType === "delete") {
        eventName = "remove_from_cart"
      }
      if (eventType === "update") {
        if (quantity < 0) {
          eventName = "remove_from_cart"
        }
        if (quantity > 0) {
          eventName = "add_to_cart"
        }
      }
      if (!eventName) return removeEvent()

      //find line item
      let lineItem
      if (!lineItem && prevLineItem) lineItem = prevLineItem
      if (!lineItem && lineId && enrichedItems) lineItem = enrichedItems.find((li) => li.id === lineId)
      if (!lineItem && variantId && enrichedItems) lineItem = enrichedItems.find((li) => li.variant_id === variantId)
      if (!lineItem) return
      const gtmItem = getGtmItems([lineItem])[0]
      if (!gtmItem) return removeEvent()

      const variant = lineItem.variant as CalculatedVariant
      const price = Number(variant.calculated_price) / 100
      const eventQuantity = Math.abs(quantity)

      gtmItem.quantity = eventQuantity

      sendGtmEcommerceEvent(
        eventName,
        {
          currency: cart?.region?.currency_code.toUpperCase(),
          value: price * eventQuantity,
          items: [gtmItem],
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
        }
      )

      removeEvent()
    }

    gtmEvents.forEach((gtmEvent) => {
      sendGtmEvent(gtmEvent)
    })

  }, [gtmEvents, cart, enrichedItems])


  const addItem = ({
    variantId,
    quantity,
  }: {
    variantId: string
    quantity: number
  }) => {
    addLineItem.mutate(
      {
        variant_id: variantId,
        quantity: quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          timedOpen()
          setGtmEvents({ action: 'add', event: { id: nanoid(), eventType: "add", variantId, quantity } })
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  const deleteItem = (lineId: string) => {
    const prevLineItem = enrichedItems?.find((li) => li.id === lineId)
    const quantity = prevLineItem?.quantity || 0
    removeLineItem.mutate(
      {
        lineId,
      },
      {
        onSuccess: ({ cart }) => {
          if (prevLineItem) setGtmEvents({ action: 'add', event: { id: nanoid(), eventType: "delete", lineId, quantity, prevLineItem } })
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  const updateItem = ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    const previousQuantity = cart?.items?.find((li) => li.id === lineId)?.quantity || 0
    adjustLineItem.mutate(
      {
        lineId,
        quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setGtmEvents({ action: 'add', event: { id: nanoid(), eventType: "update", lineId, quantity: quantity - previousQuantity } })
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  return (
    <StoreContext.Provider
      value={{
        countryCode,
        setRegion,
        addItem,
        deleteItem,
        updateItem,
        resetCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
