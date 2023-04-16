import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"

const Shipping: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="Warranty"
        description="Warranty"
      />

      <InfoTemplate
        title="Warranty"
        text={
          <>
            <p>
              Our warranty policy is valid for 6 month from the date or purchase for manufacturing defects including color fading for gold plated products.
              All you need to do is drop us an e-mail with a subject line WARRANTY and information that we should expect a shipment from you and a tracking number.
              We will repair or replace your piece and send the product back to you. We will kindly ask you to cover the shipping expenses.
            </p>
            <p>If you bought your piece at a retailer and something is up - please contact them directly.</p>
            <p>
              Normal wear and tear such as scratches, bumps and dents are not covered by the warranty, but we are happy to renew and polish <strong>ForeverSeptember</strong> jewelry for you.
              The price for renewing your piece will vary from 10 - 40 EUR depending on the product.
              Just send us an e-mail with a picture and we will let you know if we can help and send you a quote.
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
