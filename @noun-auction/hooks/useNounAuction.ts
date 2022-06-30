import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { nounAuction } from '@noun-auction/data'
import { request, RequestDocument } from 'graphql-request'

const fetcher = (query: RequestDocument) => request('/api/graphql', query)

async function fetchNounAuctionData(tokenId: string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GALACTUS_BASE_URL as string, {
      method: 'POST',
      /* @ts-ignore */
      headers: {
        'Content-Type': 'application/json',
        // 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
      },
      cache: 'no-store',
      body: JSON.stringify({
        query: nounAuction(tokenId),
      }),
    })
    console.log('token ID', tokenId, response)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    return response
  } catch (err) {
    console.error(err)
  }
}

export function useAuction(tokenId: string) {
  const { data, error } = useSWR(['collectionInfo', tokenId], (_, tokenId) =>
    fetchNounAuctionData(tokenId)
  )

  return {
    tokenId,
    data,
    error,
  }
}

export function useNounAuction({
  tokenId,
  refreshInterval,
}: {
  tokenId: string
  refreshInterval: any
}) {
  const [events, setEvents] = useState<any>([])

  useEffect(() => {
    try {
      fetchNounAuctionData(tokenId)
        /* @ts-ignore */
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setEvents(data.data.events.nodes)
        })
    } catch (err) {
      console.error(err)
    }
  }, [refreshInterval])

  return {
    auctionData: events,
  }
}
