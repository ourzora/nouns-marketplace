import { pick, replace } from 'lodash'
import { stringify } from 'query-string'
import urlJoin from 'url-join'
import { MediaType } from '../models/mediaType'
import { Media } from '../models/media'

process.env.NEXT_PUBLIC_IMGIX_URL, 'NEXT_PUBLIC_IMGIX_URL environment variable not found'

const IMGIX_URL = process.env.NEXT_PUBLIC_IMGIX_URL

interface ImgixOptions {
  w?: number | string
  h?: number | string
  q?: number
  'max-h'?: number
  auto?: 'format'
  fm?: 'jpg' | 'webp' | 'png' | 'gif' | 'mp4' | 'auto'
  fit?: 'clip'
  stylize?: 'blur'
}

export function s3ToImgixURL(url: string, options: ImgixOptions = {}) {
  const queryParams = pick(options, ['h', 'w', 'q', 'fm', 'fit', 'max-h'])
  const baseURL = url.replace(
    /^https:\/\/zora-api-two-token-asset-bucket-dev\.s3\.amazonaws\.com/,
    'https://zora-assets-dev.imgix.net'
  )
  return baseURL + '?' + stringify(queryParams)
}

type AssetOptions = ImgixOptions & { original?: boolean }

export const IPFS_REGEX = /.*?\/ipfs\/(.*?)/g

export function forceHttps(url: string) {
  if (url.includes('http://')) {
    return url.replace('http://', 'https://')
  }
  return url
}

export function isRawIPFSUrl(url: string): boolean {
  return url.startsWith('ipfs://')
}

export function getIPFSUrl(
  rawUrl: string,
  basePath: string = 'https://zora-dev.mypinata.cloud',
  force?: boolean
) {
  let url: string = rawUrl

  if (isRawIPFSUrl(rawUrl)) {
    url = rawUrl.replace(
      'ipfs://',
      rawUrl.includes('/ipfs/') ? basePath + '/' : basePath + '/ipfs/'
    )
  }

  if (force) {
    url = url.replace(IPFS_REGEX, basePath + '/ipfs/')
  }

  return forceHttps(url)
}

export const isIPFSUrl = (url: string) =>
  url.startsWith('ipfs://') || url.includes('/ipfs/')

export const getImgixUrl = (url: string, options: ImgixOptions) => {
  const queryParams = pick(options, ['h', 'w', 'q', 'fm', 'fit'])
  const imgixUrl = replace(getIPFSUrl(url), IPFS_REGEX, IMGIX_URL!)
  return isIPFSUrl(url) ? urlJoin(imgixUrl, '?' + stringify(queryParams)) : url
}

export function getThumbnailUrl(media: Media, options: AssetOptions): string | undefined {
  switch (media.mediaType) {
    case MediaType.IMAGE:
      return getImgixUrl(media.contentURI, { fm: 'jpg', w: 1080, ...options })
    case MediaType.GIF:
      return getImgixUrl(media.contentURI, { fm: 'mp4', w: 1080, ...options })
  }
}
