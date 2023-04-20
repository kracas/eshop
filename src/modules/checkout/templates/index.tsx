import { CheckoutProvider } from "@lib/context/checkout-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import Link from "next/link"
import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"
import Image from "next/legacy/image"
import logo from "@assets/logo.png"

const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <div className="bg-gray-100 relative small:min-h-screen">
        <div className="h-16 bg-white">
          <nav className="flex items-center h-full justify-between content-container">
            <Link legacyBehavior href="/cart">
              <a className="text-small-semi text-gray-700 flex items-center gap-x-2 uppercase flex-1 basis-0">
                <ChevronDown className="rotate-90" size={16} />
                <span className="mt-px hidden small:block">
                  Back to shopping cart
                </span>
                <span className="mt-px block small:hidden">Back</span>
              </a>
            </Link>
            <Link legacyBehavior href="/">
              <a className="text-xl-semi flex relative w-full h-12">
                <Image src={logo} objectFit="contain" alt="" layout="fill" />
              </a>
            </Link>
            <div className="flex-1 basis-0" />
          </nav>
        </div>
        <div className="relative">
          <CheckoutLoader />
          <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] gap-y-8 content-container gap-x-8 py-12">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </div>
        <div className="py-4 w-full flex items-center justify-center">
        </div>
      </div>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
