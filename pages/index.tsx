import { Stack } from '@zoralabs/zord'
import { PageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { DaoTable } from 'compositions/Daos'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class Home extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>
    }

    return (
      <PageWrapper direction="column" gap="x6">
        <Seo />
        <PageHeader headline="The Nouns Marketplace" />
        <Stack px="x4">
          <DaoTable />
          <CollectionRanking />
        </Stack>
      </PageWrapper>
    )
  }
}

export default Home
