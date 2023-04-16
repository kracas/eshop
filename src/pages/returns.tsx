import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"

const Shipping: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="Returns & Exchanges"
        description="Returns and exchanges"
      />

      <InfoTemplate
        title="Returns & Exchanges"
        text={
          <>
            <ol className="list-decimal">
              <li>We are happy to exchange an item bought on our website with a new size within 30 days upon receiving an item. Jewelry must be returned in the same condition it arrived in, including all branded packaging and filled out the Returns &amp; Exchanges form.</li>
              <li>We are happy to accept a purchase made on our online shop back within 14 days upon receiving of an item. Jewelry must be returned in the same condition it arrived in, including all branded packaging and filled out the Returns &amp; Exchanges form. We do not cover shipping costs.</li>
              <li>Send the items to the address provided below. We recommend using a tracked post and save the tracking information or better yet send it to us at <a href="mailto:hello@forever-september.com" className="underline">hello@forever-september.com</a></li>
              <li>In case of exchange, we will send you an exchanged item as soon as we receive your shipment. You will receive an updated tracking information to your e-mail</li>
              <li>In case of return, we will return the money to the same account you made a purchase from as soon as we receive your shipment.</li>
              <li>We do not offer free returns or refund shipping costs.</li>
              <li>If you&apos;re returning goods from outside of EU please write &quot;RETURNED GOODS&quot; on the shipping box. Otherwise it will get stuck in the customs and the exchange/refund process will be dragged out.</li>
            </ol>
            <p><a title="Returns &amp; Exchanges form" href="/Returns-Exchanges-form.pdf" target="_blank" rel="noopener noreferrer" className="underline">Download Returns &amp; Exchanges Form</a></p>
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
