import { Tab } from "@headlessui/react"
import { Product } from "@medusajs/medusa"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import clsx from "clsx"
import { useMemo } from "react"
import Link from "next/link"

type ProductTabsProps = {
  product: Product
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    return [
      // {
      //   label: "Product Information",
      //   component: <ProductInfoTab product={product} />,
      // },
      {
        label: "Shipping & Returns",
        component: <ShippingInfoTab />,
      },
    ]
  }, [])

  return (
    <div>
      <Tab.Group>
        <Tab.List className="border-b border-gray-200 box-border grid grid-cols-2">
          {tabs.map((tab, i) => {
            return (
              <Tab
                key={i}
                className={({ selected }) =>
                  clsx(
                    "text-left uppercase text-small-regular pb-2 -mb-px border-b border-gray-200 transition-color duration-150 ease-in-out",
                    {
                      "border-b border-gray-900": selected,
                    }
                  )
                }
              >
                {tab.label}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, j) => {
            return <div key={j}>{tab.component}</div>
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

// const ProductInfoTab = ({ product }: ProductTabsProps) => {
//   return (
//     <Tab.Panel className="text-small-regular py-8">
//       <div className="grid grid-cols-2 gap-x-8">
//         <div className="flex flex-col gap-y-4">
//           <div>
//             <span className="font-semibold">Material</span>
//             <p>{product.material ? product.material : "-"}</p>
//           </div>
//           <div>
//             <span className="font-semibold">Country of origin</span>
//             <p>{product.origin_country ? product.origin_country : "-"}</p>
//           </div>
//           <div>
//             <span className="font-semibold">Type</span>
//             <p>{product.type ? product.type.value : "-"}</p>
//           </div>
//         </div>
//         <div className="flex flex-col gap-y-4">
//           <div>
//             <span className="font-semibold">Weight</span>
//             <p>{product.weight ? `${product.weight} g` : "-"}</p>
//           </div>
//           <div>
//             <span className="font-semibold">Dimensions</span>
//             <p>
//               {product.length && product.width && product.height
//                 ? `${product.length}L x ${product.width}W x ${product.height}H`
//                 : "-"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </Tab.Panel>
//   )
// }

const ShippingInfoTab = () => {
  return (
    <Tab.Panel className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Delivery</span>
            <p className="max-w-sm text-justify">
              <p><strong>
                We offer free EU shipping on orders over €100 and over €200 worldwide.
                If you spend less then that, shipping charge will apply on check out procedure.
              </strong></p>
              <p>
                <strong>Every single piece is HAND MADE after an order is received. </strong>
                It usually takes 3-5 business days to make it and additional 1-2 business days to ship it.
                In the best case scenario your order will be shipped within 4-7 business days.
              </p>
              <p>
                Shipments to non-EU countries may take longer due to the customs procedures.
                Shipments may also be liable for customs taxes and additional fees.
                These costs will be the responsibility of the buyer and will be settled at the given customs office.
                We will take care of the paperwork required for the parcel to clear customs.
                To find out the taxes that may be applied please go to your local customs site to check the rates for items purchased at the EU.
              </p>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Exchanges</span>
            <p className="max-w-sm text-justify">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.{' '}
              <Link
                title="Returns &amp; Exchanges form"
                href="/returns"
                rel="noopener noreferrer"
                className="underline"
              >
                Follow these instructions to make sure your exchange is processed quickly and efficiently.
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free. <a title="Returns &amp; Exchanges form" href="/Returns-Exchanges-form.pdf" target="_blank" rel="noopener noreferrer" className="underline">Download Returns &amp; Exchanges Form</a>
            </p>
          </div>
        </div>
      </div>
    </Tab.Panel>
  )
}

export default ProductTabs
