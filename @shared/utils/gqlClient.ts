import { GraphQLClient } from 'graphql-request'

if (!process.env.NEXT_PUBLIC_GALACTUS_BASE_URL || !process.env.NEXT_PUBLIC_ZORA_API_KEY) {
  throw new Error(
    'Missing environment variables: NEXT_PUBLIC_GALACTUS_BASE_URL, NEXT_PUBLIC_ZORA_API_KEY'
  )
}

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GALACTUS_BASE_URL, {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
    'X-ENABLE-NOUNS': 'true',
  }),
  mode: 'no-cors',
})

export { client }
