import { Popover, Transition } from "@headlessui/react"
import clsx from "clsx"
import Link from "next/link"
import React, { useState } from "react"
import { ProductCategory } from "@medusajs/medusa"


const PopoverMenu: React.FC<{ category: ProductCategory }> = ({ category }) => {
  const [open, setOpen] = useState(false)

  const popoverButton =
    <Popover.Button
      className={clsx(
        "transition-all ease-out duration-200 cursor-pointer uppercase"
      )}
    >
      {category.name}
    </Popover.Button>

  if (!category.category_children.length) return (
    <Link href={`/categories/${category.handle}`} className="relative flex h-full">
      {category.name}
    </Link>
  )

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="h-full"
    >
      <div className="flex">
        <Popover className="relative flex justify-center">
          <>
            <div
              title={category.name}
              className={clsx("before:block before:content-[attr(title)] before:font-bold before:h-0 before:overflow-hidden before:invisible before:uppercase", { "font-semibold": open })}>
              {popoverButton}
            </div>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                static
                className="absolute pt-1 text-gray-900m w-40 top-full"
              >
                <div className="bg-white py-1 w-full overflow-scroll max-h-[70vh]">
                  <div className="flex items-start px-4">
                    <div className="flex flex-col flex-1">
                      <div className="flex items-start flex-col">
                        {category.category_children.map((category_child) => {
                          return (
                            <div key={category_child.id} className="pb-2">
                              <Link
                                href={`/categories/${category_child.handle}`}
                                onClick={() => setOpen(false)}
                              >
                                {category_child.name}
                              </Link>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    </div>
  )
}

export default PopoverMenu 
