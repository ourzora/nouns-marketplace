import { ZDK } from '@zoralabs/zdk'

export const zdk = new ZDK({
  endpoint: 'https://api.zora.co/graphql',
  apiKey: process.env.NEXT_PUBLIC_ZORA_API_KEY,
})
