import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"
import PhotoText from "@modules/info/components/photoText"
import photo from "@assets/about.jpg"

const Shipping: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="About Us"
        description="About us and what we do"
      />
      <PhotoText image={photo} text="About us" />
      <InfoTemplate
        title=""
        text={
          <>
            <p><strong>ForeverSeptember</strong> is life and wisdom knit into little pieces of art by jeweler <strong>Agnė Butvilaitė</strong>.</p>
            <p>
              These are the kind of accessories that let you breathe, be adventurous and yet elegant.
              The careful combination of old world and new world materials feels refreshing, subtle and most importantly - full of life.
            </p>
            <p>
              The beauty of handmade ForeverSeptember jewelry lies in the fact that no two pieces are exactly alike.
              Different materials offers its own unique qualities and can be combined in endless ways to create one-of-a-kind pieces.
              Which is a beautiful and unique form of art that offers a special touch to any outfit.
              Individuality of each piece makes it a truly special accessory that is sure to be treasured for years to come.
            </p>
            <p>Be unique, be alive. <br />That&apos;s your <strong>ForeverSeptember</strong>.</p>
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
