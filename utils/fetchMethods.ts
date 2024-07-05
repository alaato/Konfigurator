export async function fetchProducts() {
  const { data: products, pending, error, refresh } = await useFetch('https://save-air.de/store-api/search', {
    cache:"force-cache",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'sw-access-key': 'SWSCUTJJOVFPZ1UXOUTQEVDVBG'
    },
    body: `{
  "search": "ver",
  "includes": {
    "product_sorting": [
      "id",
      "translated"
    ],
    "product_manufacturer": [
      "id",
      "translated"
    ],
    "product": [
      "id",
      "name",
      "translated",
      "cover",
      "calculatedPrice",
      "productNumber"
    ],
    "property_group": [
      "id",
      "name",
      "translated",
      "options"
    ],
    "property_group_option": [
      "id",
      "name",
      "translated"
    ],
    "calculated_price": [
      "unitPrice",
      "totalPrice",
      "listPrice"
    ],
    "product_media": [
      "media"
    ],
    "media_thumbnail": [
      "width",
      "height",
      "url"
    ]
  },
  "limit":2
}`
  })
  return { data: products, pending, error, refresh }
}
