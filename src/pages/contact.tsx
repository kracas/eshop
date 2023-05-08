
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"

const Contact: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="Try it on"
        description="Places where you can try our jewelry"
      />
      <InfoTemplate
        title=""
        text={
          <>
            <div className="text-base mt-1">ForeverSeptember</div>
            <div className="text-xs">
              Agnė Butvilaitė
              <br />
              Pilies g. 16
              <br />
              01123 Vilnius, Lithuania
            </div>
            <div className="text-xs">
              <a href="email:hello@forever-september.com">hello@forever-september.com</a>
              <br />
              <a href="tel:+37068763351">+37068763351</a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d576.6254400966168!2d25.2888569696661!3d54.68319747358279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd9416598467d1%3A0xc823690ca23686a6!2sPilies%20g.%2016%2C%2001124%20Vilnius!5e0!3m2!1sen!2slt!4v1681469909768!5m2!1sen!2slt"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </>
        }
      />
    </>
  )
}

Contact.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Contact
