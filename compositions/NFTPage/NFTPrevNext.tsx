import { Button } from 'components/Button'

import { arrowButton } from '@market/components/PriceCards.css'
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
    <Flex
      //  w="x20"
      gap="x2"
    >
      <Button
        className={[styles.nftNextButton]}
        disabled={!hasPreviousNFT}
        onClick={handlePrev}
        // variant="circle"
        variant="unset"
        // onClick={() => setCurrentCard(nextCard)}
        // className={arrowButton}
      >
        ←
      </Button>
      <Button
        // className={[styles.nftNextButton]}
        className={[styles.nftNextButton]}
        // className={arrowButton}
        disabled={!hasNextNFT}
        onClick={handleNext}
        // variant="circle"
        variant="unset"
      >
        →
      </Button>
    </Flex>
  )
}
