import { useEffect, useState, useMemo } from 'react'
import { nounAuctionsHistoryQuery } from '@noun-auction/data'

/**
 * Use SWR for this stuff.
 */

async function fetchNounAuctionData() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GALACTUS_BASE_URL as string, {
      method: 'POST',
      /* @ts-ignore */
      headers: {
        'Content-Type': 'application/json' /*
        'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY*/,
      },
      cache: 'no-store',
      body: JSON.stringify({
        query: nounAuctionsHistoryQuery(),
      }),
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    return response
  } catch (err) {
    console.error(err)
  }
}

export function useNounAuctionsHistoryQuery() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState<null | any>(null)
  const [activeAuctionToken, setActiveAuctionToken] = useState<undefined | string>(
    undefined
  )

  const data = useMemo(() => {
    try {
      fetchNounAuctionData()
        /* @ts-ignore */
        .then((response) => response?.json())
        .then((data) => {
          setLoading(false)
          try {
            const activeToken = data?.data?.markets?.nodes.find(
              (token: any) => token?.market?.status === 'ACTIVE'
            ).market.tokenId
            setActiveAuctionToken(activeToken)
          } catch (err) {
            console.error(err)
          }
          return data?.data?.markets
        })
    } catch (err) {
      console.error(err)
      setErrorMsg(err)
      setError(true)
    }
  }, [])

  return {
    loading,
    error,
    errorMsg,
    data,
    activeAuctionToken,
  }
}

export function useNounAuctionsHistory({ refreshInterval }: { refreshInterval: any }) {
  const [events, setEvents] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState<null | any>(null)

  useEffect(() => {
    try {
      fetchNounAuctionData()
        /* @ts-ignore */
        .then((response) => response?.json())
        .then((data) => {
          setLoading(false)
          setEvents(data.data.markets.nodes)
        })
    } catch (err) {
      console.error(err)
      setErrorMsg(err)
      setError(true)
    }
  }, [refreshInterval])

  return {
    auctionsHistory: events,
    loading,
    error,
    errorMsg,
  }
}
