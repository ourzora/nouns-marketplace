import { MediaType } from './mediaType'
import { Playback } from './playback'

export interface Media {
  // Base NFT with minimal set
  contentURI: string
  mediaType: MediaType
  playback?: Playback
}
