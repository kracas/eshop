import NextImage from "next/legacy/image"
import { Image } from "@medusajs/medusa"

const Slide: React.FC<{ image: Image, index: number }> = ({ image, index }) => {

  return (

      <div className="relative flex-[0_0_100%]">
       <div className="w-full relative aspect-square">
          <NextImage
            src={image.url}
            layout="fill"
            objectFit="cover"
            priority={index <= 2 ? true : false}
            className="absolute inset-0"
            alt={`Product image ${index + 1}`}
          />
       </div>
      </div>
  )
}

export default Slide
