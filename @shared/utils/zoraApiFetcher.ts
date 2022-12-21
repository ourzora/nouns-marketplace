import { DocumentNode } from 'graphql'

import * as Sentry from '@sentry/react'

import { client } from './gqlClient'

export async function zoraApiFetcher<T>(query: DocumentNode, providedVariables?: any) {
  let variables = {
    network: { chain: 'MAINNET', network: 'ETHEREUM' },
    ...providedVariables,
  }

  try {
    const response = await client.request(query, variables)
    return response
  } catch (err) {
    Sentry.captureException(err)
  }
}
