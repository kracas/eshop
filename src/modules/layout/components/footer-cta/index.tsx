import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/legacy/image"
import { useEffect } from "react"
import Instafeed from "@lib/instafeed"

const FooterCTA = () => {
  useEffect(() => {
    const feed = new Instafeed({
      accessToken: 'IGQVJYMlRmaS1vMTVrOE5heDBrbHdBSmJlNmFleExGWGl0SE9qZA3pBUmpTQ3pUendtQWRBOEpOTXJFd01QZAHJLTGROdkVIcmZAJSU1iZAFhpY3d3SXJ2QmR6UnJJNmpZAODBtV0VWRFdWWFZAJb2s5dU5NMQZDZD',
      limit: 6,
      template: '<a href="{{link}}" target="_blank"><img class="w-24 h-24 md:w-60 md:h-60 object-cover" title="{{caption}}" src="{{image}}" /></a>',
    });
    feed.run();
  }, [])

  return (
    <div className="bg-red-50 w-full">
      <h3 className="text-2xl text-center pt-8"><a href="https://www.instagram.com/foreverseptember.lt/" target="_blank">Insta Stories</a></h3>
      <div className="flex justify-center py-4">
        <div id="instafeed" className="flex flex-wrap gap-1 md:gap-3 flex-row justify-center justify-items-center max-w-xs md:max-w-4xl" />
      </div>
      <div>
        <h3 className="text-2xl-semi text-center">Shop Agnė&apos;s Favorites</h3>
        <div className="pb-6">
          <UnderlineLink href={`${process.env.NEXT_PUBLIC_FAVORITES_CATEGORY_ID ? `/collections/${process.env.NEXT_PUBLIC_FAVORITES_CATEGORY_ID}` : '/store'}`}>Explore products</UnderlineLink>
        </div>
      </div>
    </div>
  )
}

export default FooterCTA
