import { useMemo } from 'react'
import { addIPFSGateway } from '@media/utils/addIPFSGateway'

export function useRawImageTransform(mediaUrl: string | undefined) {
  const image = useMemo(() => {
    return mediaUrl ? addIPFSGateway(mediaUrl) : ''
  }, [mediaUrl])

  return {
    image,
  }
}
