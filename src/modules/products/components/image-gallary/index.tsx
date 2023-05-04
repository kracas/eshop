import { Image as MedusaImage } from "@medusajs/medusa"
import { useRef, useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Slide from "./slide"
import Dots from "./dots"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function selectHandler() {
      // selectedScrollSnap gives us the current selected index.
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }

    emblaApi?.on("select", selectHandler);
    // cleanup
    return () => {
      emblaApi?.off("select", selectHandler);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const imageRefs = useRef<(HTMLDivElement | null)[]>([])


  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => {
            return (
              <Slide key={image.id} image={image} index={index} />
            )
          })}
        </div>


      </div>
      <div><Dots itemsLength={images.length} selectedIndex={selectedIndex} scrollTo={scrollTo} /></div>
    </>
  )
}

export default ImageGallery
