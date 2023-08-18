import { EnrichedLineItem } from "@lib/hooks/use-enrich-line-items";
import { CalculatedVariant } from "types/medusa"
import { ProductCategory } from "@medusajs/medusa";

export const sendGtmEcommerceEvent = (name: Gtag.EventNames, params: Gtag.EventParams | Gtag.CustomParams) => {
  gtag("event", name, { ...params, first_party_collection: true })
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

export const getGtmPriceDiscount = (variant: CalculatedVariant) => {
  const price = Number(variant.calculated_price) / 100
  const oldPrice = Number(variant.original_price) / 100
  const discount = oldPrice - price
  return { price, discount: discount > 0 ? discount : undefined }
}

export const getGtmItems = (items: EnrichedLineItem[]) => {
  return items.map(item => {
    if (!item) return {}
    const product = item.variant.product;
    if (!product) return {}

    const variant = item.variant as CalculatedVariant
    const priceAndDiscount = getGtmPriceDiscount(variant)
    const categories = getGtmCategories(product.categories)

    const gtmItem: Gtag.Item = {
      ...categories,
      ...priceAndDiscount,
      item_name: product.title,
      item_id: item.id,
      item_variant: item.variant.title,
      quantity: item.quantity,
    }
    return gtmItem
  })
}
