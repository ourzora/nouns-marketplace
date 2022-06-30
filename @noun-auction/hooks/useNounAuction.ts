import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { prepareJson } from '@shared'
import { nounAuction } from '@noun-auction/data'

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
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const res = response.json()
    return res
  } catch (err) {
    console.error(err)
  }
}

export function useNounAuction(tokenId: string) {
  const { data: response, error } = useSWR(['collectionInfo', tokenId], (_, tokenId) =>
    fetchNounAuctionData(tokenId)
  )

  return {
    tokenId,
    data: response?.data ? response?.data : undefined,
    error,
  }
}
