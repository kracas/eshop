import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/legacy/image"
import { StaticImageData } from "next/legacy/image"

const Slide: React.FC<{ image: StaticImageData, text: string, linkText: string, linkUrl: string, }> = ({ image, text, linkText, linkUrl }) => {

  return (
    <div className="relative flex-[0_0_100%]">
      <div className="h-[90vh] w-full relative">
        <div className="text-white absolute inset-0 z-10 mb-14 flex flex-col justify-end items-center text-center">
          <h1 className="text-xl-semi mb-4 drop-shadow-md shadow-black uppercase px-10">
            {text}
          </h1>
          <UnderlineLink href={linkUrl}>{linkText}</UnderlineLink>
        </div>
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="Product photo in hero"
          className="absolute inset-0"
          draggable="false"
          unoptimized
          placeholder="blur"
        />
      </div>
    </div>
  )
}

export default Slide
