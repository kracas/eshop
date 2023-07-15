import { EnrichedLineItem } from "@lib/hooks/use-enrich-line-items";
import { CalculatedVariant } from "types/medusa"
import { ProductCategory } from "@medusajs/medusa";

export const sendGtmEcommerceEvent = (name: Gtag.EventNames, params: Gtag.EventParams) => {
  window.dataLayer?.push({ ecommerce: null })
  window.dataLayer?.push({
    event: name,
    ecommerce: params
  })
};

export const getGtmCategories = (categories: ProductCategory[]): Record<string, string> => {
  let categoryCount = 1
  const gtmCategories: Record<string, string> = {}
  if (categories.length) for (const category of categories) {
    if (categoryCount > 5) break
    gtmCategories[`item_category${categoryCount > 1 ? categoryCount : ""}`] = category.handle
    categoryCount++
  }
  return gtmCategories
}

export const getGtmItems = (items: EnrichedLineItem[]) => {
  return items.map(item => {
    if (!item) return {}
    const product = item.variant.product;
    if (!product) return {}

    const variant = item.variant as CalculatedVariant
    const price = Number(variant.calculated_price) / 100
    const oldPrice = Number(variant.original_price) / 100
    const discount = oldPrice - price
    const categories = getGtmCategories(product.categories)

    const gtmItem: Gtag.Item = {
      ...categories,
      item_name: product.title,
      item_id: item.variant.sku,
      item_variant: item.variant.title,
      discount: discount > 0 ? discount : undefined,
      price,
      quantity: item.quantity,
    }
    return gtmItem
  })
}
