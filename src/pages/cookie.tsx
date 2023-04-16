import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"

const Shipping: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="Cookie Policy"
        description="Cookie Policy"
      />

      <InfoTemplate
        title="Cookie Policy"
        text={
          <>
            <p><strong>Cookies Policy</strong></p>
            <p>ForeverSeptember uses cookies on <a href="https://forever-september.com">www.forever-september.com</a> &#40;the “Service”&#41;. By using the Service, you consent to the use of cookies.</p>
            <p>Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.</p>
            <p><strong>What are cookies</strong></p>
            <p>A cookie is a small amount of information that&apos;s downloaded to your computer or device when you visit certain websites. We use a number of different cookies on our website, including strictly necessary, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences &#40;such as login and region selection&#41;. This means you don&apos;t have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it&apos;s their first time visiting or if they are a frequent visitor.</p>
            <p><strong>How ForeverSeptember uses cookies</strong></p>
            <p>When you use and access the Service, we may place a number of cookies file in your web browser. We use cookies for the following purposes: to enable certain functions of the Service, to provide analytics, to store your preferences, to enable advertisements delivery, including behavioral advertising.</p>
            <p>Some cookies are necessary to allow you to browse our website, use its features, and access secure areas. The use of these cookies is essential for the website to work. For example, we use user-input cookies for the duration of a session to keep track of a user&apos;s input when filling in forms that span several pages. </p>
            <p>We also use functional cookies to remember choices you&apos;ve made or information you&apos;ve provided, such as your username, language, or the region you are in. This allows us to tailor your website experience specifically to your preferences. For example, authentication cookies are functional cookies that are used for the duration of a session &#40;or persistent, if you agree to the “remember me” function&#41; to allow users to authenticate themselves on subsequent visits or to gain access to authorized content across pages. The functional cookies we use include: </p>
            <ul className="list-disc">
              <li><strong>User-centric security cookies</strong> to detect authentication abuses for a limited persistent duration, like repeated failed login attempts. These cookies are set for the specific task of increasing the security of the service.</li>
              <li><strong>Multimedia content player session cookies</strong> &#40;flash cookies&#41; are used for the duration of a session to store technical data needed to play back video or audio content &#40;e.g. image quality, network link speed, and buffering parameters&#41;. </li>
              <li><strong>Load balancing session cookies </strong>are used for the duration of the session to identify the same server in the pool in order for the load balancer to redirect user requests appropriately.</li>
              <li><strong>User interface customization persistent cookies</strong> are used to store a user&apos;s preference regarding a service across web pages. </li>
            </ul>
            <p>ForeverSeptember is dedicated to user experience and we use many tools to help us improve our website. To this end, we use <strong>reporting and analytics cookie</strong>s to collect information about how you use our website. These cookies only gather information for statistical purposes and only use pseudonymous cookie identifiers that do not directly identify you. The performance cookies we use include:</p>
            <ul className="list-disc">
              <li><strong>First party analytics cookies</strong>- We use these cookies to estimate the number of unique visitors, to improve our website and to detect the most searched for words in search engines that lead to a webpage. These cookies are not used to target you with online marketing. We use these cookies to learn how our website is performing and make relevant improvements to improve your browsing experience.</li>
              <li><strong>Third party analytics cookies</strong>- We also use Google Analytics and other third-party analytics providers listed below to help measure how users interact with our website content. These cookies “remember” what our users have done on previous pages and how they&apos;ve interacted with the website. For instructions on how opt out of Google Analytics, see below.</li>
            </ul>
            <p>Advertising cookies are used on our website to tailor marketing to you and your interests and provide you with a more personalized service in the future. These cookies remember that you visited our website and we may share this information with third-parties, such as advertisers. Although these cookies can track your device&apos;s visits to our website, they typically cannot personally identify you. Without these cookies, the advertisements that you see may be less relevant and interesting to you.</p>
            <p><strong>Social and Content cookies</strong> are placed by many social media plugins &#40;for example the Facebook &apos;like&apos; button&#41;, and other tools meant to provide or improve the content on a website &#40;for example services that allow the playing of video files, or that create comments sections&#41;. We integrate these modules into our platform to improve the experience of browsing and interacting with our website. Please note that some of these third party services place cookies that are also used for things like behavioral advertising, analytics, and/or market research.<strong> </strong></p>
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
