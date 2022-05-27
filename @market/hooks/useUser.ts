import useSWR from 'swr'
import { shortenAddress } from '../utils/format'
import { useProvider } from 'wagmi'

export type AddressType = string | undefined

export interface User {
  ensAvatar?: string
  address?: AddressType
  displayName?: string
  user?: {
    address?: string
    ensAvatar?: string
    ensName?: string
    displayName?: string
    bio?: string
    website?: string
    twitter?: string
    discord?: string
  }
}

export function useUser(address: any = '', extendedData: boolean = true): User {
  const provider = useProvider()

  const fallbackData = {
    address: address,
    displayName: shortenAddress(address),
    ensName: undefined,
    ensAvatar: undefined,
    bio: undefined,
    website: undefined,
    twitter: undefined,
    discord: undefined,
  }

  const getENSData = async (address: string) => {
    let results: string[] = []
    const name = await provider.lookupAddress(address)
    if (!name) return fallbackData
    const resolver = await provider.getResolver(name)
    if (!resolver) return fallbackData
    const avatar = await resolver.getAvatar()

    if (extendedData) {
      results = await Promise.all([
        resolver.getText('url'),
        resolver.getText('description'),
        resolver.getText('com.twitter'),
        resolver.getText('com.discord'),
      ])
    }

    const [website, bio, twitter, discord] = results.map((x) =>
      x && typeof x === 'string' ? x : undefined
    )

    return {
      ...fallbackData,
      address,
      ensName: name,
      displayName: name,
      ensAvatar: avatar?.url,
      website,
      bio,
      twitter,
      discord,
    }
  }

  const { data: userData } = useSWR(address, getENSData, {
    fallbackData,
    dedupingInterval: 1000,
  })

  return {
    user: userData,
    ensAvatar: userData?.ensAvatar,
    address: address,
    displayName: userData?.displayName,
  }
}
