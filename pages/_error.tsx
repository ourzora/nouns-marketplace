import type { NextPage } from 'next'
import type { ErrorProps } from 'next/error'
import NextErrorComponent from 'next/error'

import * as Sentry from '@sentry/nextjs'

const CustomErrorComponent: NextPage<ErrorProps> = (props) => {
  return <NextErrorComponent statusCode={props.statusCode} />
}

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
