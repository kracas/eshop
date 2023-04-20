import Link from "next/link"
import React from "react"

const MenuItem: React.FC<{ title: string, items: { title: string, url: string }[] }> = ({ title, items }) => {

  return (
    <div className="flex flex-col gap-y-2">
      <span className="text-base-semi uppercase">{title}</span>
      <ul className="grid grid-cols-1 gap-y-2">
        {items.map((item, index) =>
          <li key={`${title}-${index}`}>
            <Link legacyBehavior href={item.url}>
              <a>
                {item.title}
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>

  )
}

export default MenuItem
