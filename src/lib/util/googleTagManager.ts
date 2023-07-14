export const sendGtmEcommerceEvent = (name: Gtag.EventNames, params: Gtag.EventParams) => {
  window.dataLayer?.push({ ecommerce: null })
  window.dataLayer?.push({
    event: name,
    ecommerce: params
  })
};