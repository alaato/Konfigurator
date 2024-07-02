export async function fetchProducts() {
  const { data: products, pending, error, refresh } = await useFetch('https://save-air.de/store-api/search', {
    cache:"reload",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'sw-access-key': 'SWSCUTJJOVFPZ1UXOUTQEVDVBG'
    },
    body: '{ "search": " ver", "limit":2}'
  })
  return { data: products, pending, error, refresh }
}
