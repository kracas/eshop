import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="py-12">
      <div className="content-container">
        <div className="flex flex-col items-center text-center mb-10 text-2xl-regular text-gray-900 max-w-lg">
          Agnė&apos;s Favorites
        </div>
        <ul className="products-grid">
          {data
            ? data.map((product) => (
              <li key={product.id}>
                <ProductPreview {...product} />
              </li>
            ))
            : Array.from(Array(4).keys()).map((i) => (
              <li key={i}>
                <SkeletonProductPreview />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default FeaturedProducts
