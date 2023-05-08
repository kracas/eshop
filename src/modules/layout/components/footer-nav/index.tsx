import MenuItem from "./menuItem"
import CountrySelect from "../country-select"

const FooterNav = () => {

  return (
    <div className="content-container flex flex-col gap-y-8 pt-10 pb-8">
      <div className="flex flex-col gap-y-6 xsmall:flex-row justify-center">
        <div className="text-small-regular grid sm:grid-cols-3 grid-cols-2 gap-x-10 gap-y-6">
          <MenuItem
            title='About us'
            items={[
              { title: 'About Us', url: "/about" },
              { title: 'Try it on Today', url: "/locations" },
              { title: 'Contact Us', url: "/contact" },

            ]}
          />
          <MenuItem
            title='CUSTOMER CARE'
            items={[
              { title: 'Jewelry Care', url: "/care" },
              { title: 'Shipping & Delivery', url: "/shipping" },
              { title: 'Returns & Exchanges', url: "/returns" },
              { title: 'Warranty', url: "/warranty" },
              { title: 'Ring Size', url: "/ring-size" },
            ]}
          />
          <MenuItem
            title='Terms of service'
            items={[
              { title: 'Privacy Policy', url: "/privacy" },
              { title: 'Cookie Policy', url: "/cookie" },
              { title: 'Terms of Service', url: "/terms" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col-reverse gap-y-4 justify-center xsmall:items-center xsmall:flex-row xsmall:items-end xsmall:justify-between">
        <span className="text-xsmall-regular text-gray-500">
          © Copyright {new Date().getFullYear()} ForeverSeptember
        </span>
        <div className="min-w-[316px] flex xsmall:justify-end">
          <CountrySelect />
        </div>
      </div>
    </div>
  )
}

export default FooterNav
