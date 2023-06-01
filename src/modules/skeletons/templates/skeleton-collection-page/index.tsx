import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const SkeletonCollectionPage = () => {
  return (
    <div className="content-container py-6">
      <div className="animate-pulse mb-8">
        <div className="w-96 h-20 bg-gray-100"></div>
      </div>
      <ul className="products-grid flex-1">
        {repeat(8).map((index) => (
          <li key={index}>
            <SkeletonProductPreview />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkeletonCollectionPage
