import { useMemo } from 'react'

import { useNounishAuctionProvider } from '@noun-auction/providers'
import { rowLoader } from '@noun-auction/styles/NounishStyles.css'
import { Box, Flex, Icon } from '@zoralabs/zord'

const lilLoader = './assets/nounish/lil-loading-skull.gif'
const nounLoader = './assets/nounish/loading-skull-noun.gif'

export function RowLoader() {
  const {
    daoConfig: { name },
  } = useNounishAuctionProvider()
  const loaderImage = useMemo(() => (name === 'LilNoun' ? lilLoader : nounLoader), [name])

  return (
    <Flex className={[rowLoader]}>
      {name ? (
        <Box as="img" src={loaderImage} w="100%" h="100%" inset="x0" objectFit="cover" />
      ) : (
        <Icon id="Spinner" size="lg" />
      )}
    </Flex>
  )
}
