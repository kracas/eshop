import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"

const Shipping: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="Shipping & Delivery"
        description="Shipping and delivery"
      />

      <InfoTemplate
        title="Shipping & Delivery"
        text={
          <>
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
            <p><strong>TRACKING NUMBER</strong></p>
            <p>
              You will receive a tracking number and a link where you can track your order.
              It can take up to 24 hours from the shipping day for your tracking number to appear in the courier&apos;s system depending on the courier you chose.
            </p>
            <p>
              If you haven&apos;t received shipping confirmation e-mail within 7 business days - please check your spam inbox and if it&apos;s not there - inform us at <a href="mailto:hello@forever-september.com" className="underline">hello@forever-september.com</a>
            </p>
          </>
        }
      />
    </>
  )
}

Shipping.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Shipping
