import Image from "next/image"
import { StaticImageData } from "next/image"

const PhotoText: React.FC<{ image: StaticImageData, text: string }> = ({ image, text }) => {

  return (
    <div className="relative flex-[0_0_100%] m-5">
      <div className="h-[90vh] w-full relative">
        <div className="text-white absolute inset-0 z-10 mb-14 flex flex-col justify-end items-center text-center small:text-left small:justify-end small:items-start small:p-32">
          <h1 className="text-xl-semi mb-4 drop-shadow-md shadow-black uppercase px-10">
            {text}
          </h1>
        </div>
        <Image
          src={image}
          layout="fill"
          loading="eager"
          priority={true}
          objectFit="cover"
          alt=""
          className="absolute inset-0"
          draggable="false"
        />
      </div>
    </div>
  )
}

export default PhotoText
