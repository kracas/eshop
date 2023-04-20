import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/legacy/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useState, useEffect } from "react"
import Slide from "./slide"
import Dots from "./dots"

import bracelets from "@assets/Cover-bracelets-scaled.webp"
import heart from "@assets/Cover-heart-colection-scaled.webp"
import necklaces from "@assets/Cover-necklaces-scaled.webp"
import gemstones from "@assets/Cover-gemstones.webp"

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6500, stopOnInteraction: false })]);

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

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          <Slide image={bracelets} text="Stack them your own way" linkText="Get started" />
          <Slide image={heart} text="TO ALL OF THEM WHO WE LOVE THE MOST" linkText="Shop heart collection" />
          <Slide image={necklaces} text="ONE MORE NECKLACE WILL NOT HARM ANYONE" linkText="Shop now" />
          <Slide image={gemstones} text="FIND YOUR FAVORITE GEMSTONE" linkText="Shop now" />
        </div>
      </div>
      <Dots itemsLength={4} selectedIndex={selectedIndex} />
    </>

  )
}

export default Hero
