import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import logo from "@assets/logo.png"

const Nav = () => {

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  const { toggle } = useMobileMenu()

  return (
    <div
      className="sticky top-0 inset-x-0 z-50 group"
    >
      <div className="overflow-hidden text-center text-sm py-1 bg-black text-white" ref={emblaRef}>
        <div className="flex">
          <div className="relative flex-[0_0_100%]"><Link href='/'><a>Text</a></Link></div>
          <div className="relative flex-[0_0_100%]"><Link href='/'><a>Text 2</a></Link></div>

        </div>
      </div>
      <header
        className="relative h-16 px-4 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200 !bg-white !border-gray-200"
      >
        <nav
          className="text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200"
        >
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <DropdownMenu />
            </div>
          </div>

          <div className="flex items-center h-full w-full relative">
            <Link href="/">
              <a>
                <Image src={logo} objectFit="contain" alt="" layout="fill" />
              </a>
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/account">
                <a>Account</a>
              </Link>
            </div>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
