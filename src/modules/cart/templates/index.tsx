import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import DiscountCode from "@modules/checkout/components/discount-code"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page"
import { useCart, useMeCustomer } from "medusa-react"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import ItemsTemplate from "./items"
import Summary from "./summary"
import { useEffect } from "react"
import { sendGtmEcommerceEvent, getGtmItems } from "@lib/util/googleTagManager"

const CartTemplate = () => {
  const { cart } = useCart()
  const { customer, isLoading } = useMeCustomer()
  const items = useEnrichedLineItems()

  useEffect(() => {
    if (cart && cart.id?.length) {
      let gtmItems
      if (items?.length) gtmItems = getGtmItems(items)

      sendGtmEcommerceEvent('view_cart', {
        currency: cart.region.currency_code,
        value: cart?.subtotal ? cart.subtotal / 100 : undefined,
        items: gtmItems,
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
  }, [cart?.id?.length])

  if (!cart || !cart?.id?.length || isLoading) {
    return <SkeletonCartPage />
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="content-container">
        {cart.items.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-8">
            <div className="flex flex-col bg-white p-6 gap-y-6">
              {!customer && <SignInPrompt />}
              <ItemsTemplate region={cart?.region} items={items} />
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <>
                    <div className="bg-white p-6">
                      <Summary cart={cart} />
                    </div>
                    <div className="bg-white p-6">
                      <DiscountCode cart={cart} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {!customer && <SignInPrompt />}
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
