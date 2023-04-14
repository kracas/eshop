import useCurrentWidth from "@lib/hooks/use-current-width"
import useDebounce from "@lib/hooks/use-debounce"
import useToggleState from "@lib/hooks/use-toggle-state"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { ProductCategory } from "@medusajs/medusa"
import { medusaClient } from "@lib/config"

type ScreenType = "main" | "country" | "search"

interface MobileMenuContext {
  state: boolean
  open: () => void
  close: () => void
  toggle: () => void
  screen: [ScreenType, Dispatch<SetStateAction<ScreenType>>],
  categories: ProductCategory[],
}

export const MobileMenuContext = createContext<MobileMenuContext | null>(null)

export const MobileMenuProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { state, close, open, toggle } = useToggleState()
  const [screen, setScreen] = useState<ScreenType>("main")
  const [categories, setCategories] = useState<ProductCategory[]>([])

  const windowWidth = useCurrentWidth()

  const debouncedWith = useDebounce(windowWidth, 200)

  const closeMenu = useCallback(() => {
    close()

    setTimeout(() => {
      setScreen("main")
    }, 500)
  }, [close])

  useEffect(() => {
    if (state && debouncedWith >= 1024) {
      closeMenu()
    }
  }, [debouncedWith, state, closeMenu])

  useEffect(() => { }, [debouncedWith])

  useEffect(() => {
    medusaClient.productCategories
      .list({ parent_category_id: 'pcat_01GXXPSAKFR1GFFJJ4QXMYXASC', include_descendants_tree: true }) //category Menu id
      .then(({ product_categories }) => setCategories(product_categories))
      .catch(error => console.log(error))
  }, [])


  return (
    <MobileMenuContext.Provider
      value={{
        state,
        close: closeMenu,
        open,
        toggle,
        screen: [screen, setScreen],
        categories
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  )
}

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext)

  if (context === null) {
    throw new Error(
      "useCartDropdown must be used within a CartDropdownProvider"
    )
  }

  return context
}
