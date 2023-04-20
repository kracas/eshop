import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/legacy/image"
import { useEffect } from "react"
import Instafeed from "@lib/instafeed"

const FooterCTA = () => {
  useEffect(() => {
    const feed = new Instafeed({
      accessToken: 'IGQVJYMlRmaS1vMTVrOE5heDBrbHdBSmJlNmFleExGWGl0SE9qZA3pBUmpTQ3pUendtQWRBOEpOTXJFd01QZAHJLTGROdkVIcmZAJSU1iZAFhpY3d3SXJ2QmR6UnJJNmpZAODBtV0VWRFdWWFZAJb2s5dU5NMQZDZD',
      limit: 6
    });
    feed.run();
  }, [])

  return (
    <div className="bg-red-50 w-full">
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-8 relative">
        <div>
          <h3 className="text-2xl-semi">Shop the latest styles</h3>
          <div className="mt-6">
            <UnderlineLink href="/store">Explore products</UnderlineLink>
          </div>
        </div>
        <div id="instafeed" className="flex flex-wrap gap-3"/>
      </div>
    </div>
  )
}

export default FooterCTA
