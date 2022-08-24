export async function zoraApiFetcher(query: () => void) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GALACTUS_BASE_URL as string, {
      method: 'POST',
      /* @ts-ignore */
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
      },
      cache: 'no-store',
      body: JSON.stringify({
        query: query(),
      }),
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const res = response.json()
    return res
  } catch (err) {
    console.error(err)
  }
}
