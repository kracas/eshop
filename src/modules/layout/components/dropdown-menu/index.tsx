import { useCollections } from "medusa-react"
import Link from "next/link"
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import PopoverMenu from "./popover"

const DropdownMenu = () => {
  const { collections } = useCollections();
  const { categories } = useMobileMenu()

  return (
    <div className="flex gap-3 mt-2">
      {!!collections && !!collections.length && collections.map((collection) => (
        <div key={collection.id}>
          <Link
            href={`/collections/${collection.id}`}
            title={collection.title}
            className="uppercase hover:font-bold before:block before:content-[attr(title)] before:font-bold before:h-0 before:overflow-hidden before:invisible"
          >
            {collection.title}
          </Link>
        </div>
      ))}
      {!!categories && !!categories.length && categories.map((category) =>
        <PopoverMenu key={category.id} category={category} />
      )}

    </div>
  )
}

export default DropdownMenu
