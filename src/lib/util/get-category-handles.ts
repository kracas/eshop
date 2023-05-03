import { medusaClient } from "../config"
import { ProductCategory } from "@medusajs/medusa"

export const getCategoryHandles = async (): Promise<string[]> => {
  const categories = await medusaClient.productCategories
    .list({ parent_category_id: 'null', include_descendants_tree: true })
    .then(({ product_categories }) => product_categories)

  const handles: string[] = []

  const getHandles = (category: ProductCategory) => {
    if (category.handle) {
      handles.push(category.handle)
    }
    if (category.category_children) {
      for (const child of category.category_children) {
        getHandles(child)
      }
    }
  }

  for (const category of categories) {
    getHandles(category)
  }

  return handles
}
