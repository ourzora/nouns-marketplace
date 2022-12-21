import { useTokenHelper } from '@shared/hooks'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Flex, StackProps } from '@zord'

import * as styles from './NFTPage.css'

export interface NFTPrevNextProps extends StackProps {
  nftObj: NFTObject
}

export function NFTPrevNext({ nftObj, className, ...props }: NFTPrevNextProps) {
  const { hasPreviousNFT, hasNextNFT, handlePrev, handleNext } = useTokenHelper(nftObj)
  if (!nftObj) return null

  return (
    <Flex gap="x2">
      <Button
        className={[styles.nftNextButton]}
        disabled={!hasPreviousNFT}
        onClick={handlePrev}
        variant="unset"
      >
        ←
      </Button>
      <Button
        className={[styles.nftNextButton]}
        disabled={!hasNextNFT}
        onClick={handleNext}
        variant="unset"
      >
        →
      </Button>
    </Flex>
  )
}
