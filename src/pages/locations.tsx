import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"
import PhotoText from "@modules/info/components/photoText"
import photo from "@assets/locations.jpg"

const Locations: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="Try it on"
        description="Places where you can try our jewelry"
      />
      <PhotoText image={photo} text="TRY IT ON TODAY" />
      <InfoTemplate
        title=""
        text={
          <>
            <div className="text-xs">Unsure if a piece is right for you? Try it on and find out!</div>
            <div className="text-xl text-bold mt-1">Lithuania</div>
            <div className="text-base mt-1">ForeverSeptember STUDIO</div>
            <div className="text-xs">
              Pilies g. 16, 01123 Vilnius, Lithuania
              <br />
              Please call before arrival: +37068763351
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d576.6254400966168!2d25.2888569696661!3d54.68319747358279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd9416598467d1%3A0xc823690ca23686a6!2sPilies%20g.%2016%2C%2001124%20Vilnius!5e0!3m2!1sen!2slt!4v1681469909768!5m2!1sen!2slt"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="text-base mt-4">unlabel Paupys</div>
            <div className="text-xs">
              Aukštaičių g. 10, 11341 Vilnius, Lithuania
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2306.7249451444627!2d25.299294376620786!3d54.67926947416276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd951fe87234a1%3A0x1593299aadcad7a8!2sunlabel!5e0!3m2!1sen!2slt!4v1681470161298!5m2!1sen!2slt"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="text-base mt-4">unlabel Panorama</div>
            <div className="text-xs">
              Saltoniškių g. 9, LT-08105 Vilnius, Lithuania
              <br />
              2nd floor
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9222.142711432834!2d25.2575737!3d54.7001981!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd93fbfcbb09a9%3A0x9c733a6c85235f80!2sPanorama!5e0!3m2!1sen!2slt!4v1685723039964!5m2!1sen!2slt"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </>
        }
      />
    </>
  )
}

Locations.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Locations
