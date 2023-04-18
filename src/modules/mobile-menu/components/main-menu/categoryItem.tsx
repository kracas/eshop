import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import ChevronDown from "@modules/common/icons/chevron-down"
import Search from "@modules/common/icons/search"
import X from "@modules/common/icons/x"
import { useCollections, useMeCustomer } from "medusa-react"
import Link from "next/link"
import React, { useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { medusaClient } from "@lib/config"
import { ProductCategory } from "@medusajs/medusa"
import clsx from "clsx"

const CategoryItem: React.FC<{ category: ProductCategory, depth: number, keyId: string }> = ({ category, depth, keyId }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const category_children = category.category_children as ProductCategory[]

  const {
    close,
  } = useMobileMenu()

  const onCategoryClick = () => {
    if (category_children.length) return setOpen(!isOpen)
    close()
  }

  return (

    <>
      <li key={keyId}>

        <div className={`flex items-center justify-between bg-gray-50 p-4 ml-${depth * 2}`}>
          <Link href={`/categories/${category.handle}`}>
            <a onClick={close}>
              <span>{category.name}</span>
            </a>
          </Link>
          {category_children.length > 0 &&
            <button
              className="items-center"
              onClick={onCategoryClick}
            >
              <ChevronDown className={clsx(!isOpen && "-rotate-90")} />
            </button>
          }
        </div>

      </li>
      {isOpen && category_children.map(category_child =>
        <CategoryItem key={'cat_' + category_child.id} keyId={category_child.id} category={category_child} depth={depth + 1} />
      )}
    </>

  )
}

export default CategoryItem
