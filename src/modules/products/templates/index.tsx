import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")

  return (
    <ProductProvider product={product}>
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative justify-center">
        <div className="flex flex-col gap-y-8 w-full small:max-w-lg small:mr-6">
          <ImageGallery images={product.images} />
        </div>
        <div
          className="small:sticky small:top-20 w-full small:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12"
          ref={info}
        >
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
      </div>
      <div className="content-container">
        <RelatedProducts product={product} />
      </div>
      {/* <MobileActions product={product} show={!inView} /> */}
    </ProductProvider>
  )
}

export default ProductTemplate
