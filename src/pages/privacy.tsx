import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"

const Shipping: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="Privacy Policy"
        description="Privacy Policy"
      />

      <InfoTemplate
        title="Privacy Policy"
        text={
          <>
            <p>ForeverSeptember is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. ForeverSeptember may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
            <p><strong>OWNERSHIP OF THE WEBSITE</strong></p>
            <p><a href="https://forever-september.com">www.forever-september.com</a>&nbsp; belongs to:</p>
            <p>Agnė Butvilaitė</p>
            <p>Pilies g. 16, 01123 Vilnius, Lithuania</p>
            <p>Email: <a href="mailto:hello@forever-september.com">hello@forever-september.com</a></p>
            <p>Phone: <a href="tel:+37068763351">+37068763351&nbsp;&nbsp;</a></p>
            <p><strong>WHAT WE COLLECT?</strong></p>
            <p>The information we learn from customers helps us personalize and continually improve your shopping experience at ForeverSeptember. Here are the types of information we gather.</p>
            <ul>
              <li>name</li>
              <li>contact information including email address</li>
              <li>demographic information such as postcode, preferences and interests</li>
            </ul>
            <p><strong>COLLECTION, PROCESSING, AND USE OF PERSONAL DATA IN ORDERS</strong></p>
            <p>When you submit an order, we only collect and use your personal data where this is necessary for the fulfilment and handling of your requests. The provision of data is necessary for conclusion of a contract. Failure to provide it will prevent the conclusion of any contract. The processing will occur on the basis GDPR and is required for the fulfilment of a contract with you. We will not forward your data to third parties without your explicit consent. This only excludes our service partners which we require in order to handle the contractual relationship or service providers we use to process an order. Along with the recipients named in the clauses of this data protection declaration, these may be recipients in the following categories: Shipping providers, payment service providers, merchandise management service providers, service providers for order processing, web hosts, IT service providers and drop shipping dealers. We will comply strictly with legal requirements in every case. The scope of data transmission is restricted to a minimum.</p>
            <p><strong>INFORMATION SECURITY</strong></p>
            <p>As discussed above, you always can choose not to provide information, although it might be needed to make a purchase or to take advantage of additional ForeverSeptember features.</p>
            <p>You can add or update certain information on pages such as your personal account information and profile.</p>
            <p>If you don’t want to receive e-mail or other mail from us, please email us so we can further assist you.</p>
            <p>We keep the personal information we collect about you strictly confidential. Only authorized personnel have access to this personal information.</p>
            <p><strong>CONTROLLING YOUR PERSONAL INFORMATION</strong></p>
            <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
            <ul>
              <li>whenever you are asked to fill in a form on the website, do not indicate that you want the information to be used by anybody for direct marketing purposes.</li>
              <li>if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing at <a href="mailto:hello@forever-september.com">hello@forever-september.com</a></li>
            </ul>
            <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.&nbsp;</p>
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
