import { DocumentNode } from 'graphql'

import * as Sentry from '@sentry/react'

import { client } from './gqlClient'

export async function zoraApiFetcher(query: DocumentNode, providedVariables?: any) {
  let variables = {
    network: { chain: 'MAINNET', network: 'ETHEREUM' },
    ...providedVariables,
  }

  try {
    // FIXME @oleg: type
    const response = await client.request(query, variables)
    return response
  } catch (err) {
    Sentry.captureException(err)
  }
}
