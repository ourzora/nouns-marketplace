import { DocumentNode } from 'graphql'

import * as Sentry from '@sentry/react'

import { client } from './gqlClient'

export async function zoraApiFetcher(query: DocumentNode, variables?: any) {
  // haha see what I did here
  const network = { chain: 'GOERLI', network: 'ETHEREUM' }

  try {
    const response = await client.request(query, { ...variables, network })
    return response
  } catch (err) {
    Sentry.captureException(err)
  }
}
