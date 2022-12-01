import { useContractRead } from 'wagmi'

import { useEffect, useMemo, useState } from 'react'

import { nounsTokenAbi } from '@noun-auction/contracts'
import * as Sentry from '@sentry/react'

const PINATA_API_URL = 'https://gateway.pinata.cloud/ipfs/'

// FIXME
const useIpfsFile = ({ isIpfs, dataURI }: any) => {
  const [file, setFile] = useState()

  useEffect(() => {
    if (!isIpfs) return

    const fetchFile = async () => {
      try {
        const fetchIpfsData = async (ipfsHash: string) => {
          const url = `${PINATA_API_URL}${ipfsHash}`
          try {
            const res = await fetch(url)
            const json = await res.json()
            setFile(json)
          } catch (err) {
            console.error(err)
          }
        }

        await fetchIpfsData(dataURI?.replace('ipfs://', ''))
      } catch (err) {
        console.error(err)
      }

      fetchFile()
    }
  }, [dataURI, isIpfs])

  return file
}

function UnicodeDecodeB64(str: string) {
  let res = atob(str)
  try {
    return JSON.parse(res)
  } catch (err) {
    console.error(err)
    console.log({ res })
    return null
  }
}

export function useNounsToken(contractAddress: string, tokenId: string) {
  const { data: dataURI } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: nounsTokenAbi,
    functionName: 'tokenURI',
    args: [tokenId],
  })

  const isIpfs = dataURI?.startsWith('ipfs://')
  const isBase64 = dataURI?.startsWith('data:application/json;base64')
  // const isHttp = dataURI?.startsWith('https://')

  useIpfsFile({ isIpfs, dataURI })

  const decodedTokenURI = useMemo(() => {
    let data = dataURI?.substring(29)
    if (isBase64) {
      data = UnicodeDecodeB64(dataURI?.replace('data:application/json;base64,', ''))
      return data
    }

    if (dataURI) {
      try {
        const json = atob(data)
        // console.log({ json })
        const result = JSON.parse(json)
        return result
      } catch (err) {
        Sentry.captureException(err)
        return null
      }
    }
  }, [dataURI, isBase64])

  return {
    tokenData: decodedTokenURI,
  }
}
