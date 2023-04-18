import { medusaClient } from "../config"

export const getCategoryHandles = async (): Promise<string[]> => {
  const categories = await medusaClient.productCategories
    .list({ parent_category_id: 'null', include_descendants_tree: true })
    .then(({ product_categories }) => product_categories)

  const handles: string[] = []

  for (const category of categories) {
    if (category.handle) {
      handles.push(category.handle)
    }
  }

  return handles
}
