import { Button } from 'components/Button'

import { useTokenHelper } from '@shared/hooks'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, StackProps } from '@zoralabs/zord'

import * as styles from './NFTPage.css'

export interface NFTPrevNextProps extends StackProps {
  nftObj: NFTObject
}

export function NFTPrevNext({ nftObj, className, ...props }: NFTPrevNextProps) {
  const { hasPreviousNFT, hasNextNFT, handlePrev, handleNext } = useTokenHelper(nftObj)
  if (!nftObj) return null

  return (
    <Flex w="x20">
      <Button
        className={[styles.nftNextButton]}
        disabled={!hasPreviousNFT}
        onClick={handlePrev}
        variant="circle"
      >
        ←
      </Button>
      <Button
        className={[styles.nftNextButton]}
        disabled={!hasNextNFT}
        onClick={handleNext}
        variant="circle"
      >
        →
      </Button>
    </Flex>
  )
}
