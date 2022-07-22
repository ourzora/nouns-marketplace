import { useMemo } from 'react'
import { nounsTokenAbi } from '@noun-auction/contracts'
import { useContractRead } from 'wagmi'

export function useNounsToken(contractAddress: string, tokenId: string) {
  const { data: dataURI } = useContractRead({
    addressOrName: contractAddress,
    /* @ts-ignore */
    contractInterface: nounsTokenAbi,
    functionName: 'tokenURI',
    args: [tokenId],
  })

  const decodedTokenURI = useMemo(() => {
    if (dataURI) {
      try {
        const json = atob(dataURI.substring(29))
        const result = JSON.parse(json)
        return result
      } catch (err) {
        console.error(err)
      }
    }
  }, [dataURI])

  return {
    tokenData: decodedTokenURI,
  }
}
