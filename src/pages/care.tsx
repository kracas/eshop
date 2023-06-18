import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import InfoTemplate from "@modules/info/templates"

const Care: NextPageWithLayout = () => {

  return (
    <>
      <Head
        title="Jewelry Care"
        description="How to care for your jewelry"
      />

      <InfoTemplate
        text={
          <>
            <div><strong>SILVER &amp; GOLD PLATED JEWELRY CARE</strong></div>
            <div>
              <strong>ForeverSeptember </strong>jewelry is handmade with sterling silver or gold plated 24K sterling silver.
              Over the time all jewelry will oxidize, resulting in a dark or tarnished appearance.
              This is a natural process that occurs when silver reacts with sulfur in the air, which forms a layer of silver or gold plated silver sulfide on the surface of the metal.
              The good news is that this can be prevented or easily fixed with a few simple tips:
            </div>
            <div>
              <div>Avoid:</div>
              <ul className="list-disc ml-3">
                <li>Harsh chemicals and dip into cleaners should be avoided at all times.</li>
                <li>Jewelry should always be removed before bathing, showering, applying sunscreen, spraying perfume directly, swimming in a sea and chlorinated water.</li>
                <li>Scratching against hard surfaces or cleaning using paper towels as they can cause scratching also.</li>
                <li>Store in a humid place like your bathroom.</li>
              </ul>
            </div>
            <div>
              Please DO:
              <ul className="list-disc ml-3">
                <li>Clean your jewelry with soft, non abrasive and lint free cloth is quite effective to keep it shiny and lustrous.</li>
                <li>Wear your jewelry - your skin is a natural polisher.</li>
                <li>Store in a jewelry box or zip lock bag when not wearing.</li>
              </ul>
            </div>
            <div><strong>GOLD PLATING IS NOT FOREVER</strong></div>
            <div>
              Gold plating wears out over time exposing the base metal underneath.
              It also loses it&apos;s color and fades with time.
              In general, plating can last for up to 3 years wearing it every day with proper care.
              Once the plating wears of we can renew the plating.
              The price starts from 25 EUR and depends on the size of the jewelry.
              If you wish to renew your gold plated piece just send us an e-mail with a subject line GOLD PLATING and send the piece to us.
              We will polish it, renew it, gold plate it and send the piece back to you looking like new.
              We will kindly ask you to cover the shipping expenses.
            </div>
            <div>
              <strong>GEMSTONE JEWELRY CARE</strong>
            </div>
            <div>
              Gemstone beads are a precious and valuable in addition are also quiet delicate. 
              Protect them from heat and sunlight by storing them in a cool, dry place away from direct sunlight and high temperatures as the color may change or fade.
            </div>
            <div>Otherwise, the same care rules apply as <strong>SILVER &amp; GOLD PLATED JEWELRY CARE.</strong></div>
          </>
        }
        title="Jewelry Care"
      />
    </>
  )
}

Care.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Care
