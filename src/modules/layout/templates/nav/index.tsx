import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import Link from "next/link"
import { useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/legacy/image"
import logo from "@assets/logo.png"
import isBreakpoint from "@lib/util/isBreakpoint"

const Nav = () => {

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const noEmblaRef = useRef(null);

  const { toggle } = useMobileMenu()

  const isSmallScreen = isBreakpoint('small');

  return (
    <div
      className="sticky top-0 inset-x-0 z-50 group"
    >
      <div className="overflow-hidden text-center text-xs xsmall:text-sm py-1 xsmall:py-2 bg-black text-white " ref={isSmallScreen ? noEmblaRef : emblaRef}>
        <div className="flex small:justify-center small:gap-20">
          <div className="relative flex-[0_0_100%] small:flex-none"><Link legacyBehavior href='/shipping'><a>FREE WORLDWIDE SHIPPING ON ORDERS OVER €200</a></Link></div>
          <div className="relative flex-[0_0_100%] small:flex-none"><Link legacyBehavior href='/shipping'><a>FREE EUROPEAN SHIPPING ON ORDERS OVER €100</a></Link></div>
        </div>
      </div>
      <header
        className="relative h-16 small:h-24 px-4 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200 !bg-white !border-gray-200"
      >
        <nav
          className="text-gray-900 flex flex-col items-center justify-between w-full h-full text-small-regular transition-colors duration-200"
        >
          <div className="text-gray-900 grid grid-cols-[80px_auto_80px] small:grid-cols-[150px_auto_150px] w-full h-full text-small-regular transition-colors duration-200">
            <div className="h-full flex items-center">
              <div className="block small:hidden">
                <Hamburger setOpen={toggle} />
              </div>
            </div>

            <Link href="/" className="flex items-center h-full w-full relative">
              <Image src={logo} objectFit="contain" alt="" layout="fill" />
            </Link>

            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
                <Link legacyBehavior href="/account">
                  <a>Account</a>
                </Link>
              </div>
              <CartDropdown />
            </div>
          </div>
          <div className="hidden small:block">
            <DropdownMenu />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
