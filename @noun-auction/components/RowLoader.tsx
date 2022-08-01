import { Icon, Flex, Box } from '@zoralabs/zord'
import { rowLoader } from '@noun-auction/styles/NounishStyles.css'
import { useNounishAuctionProvider } from '@noun-auction/providers'

const lilLoader = './assets/nounish/lil-loading-skull.gif'
const nounLoader = './assets/nounish/loading-skull-noun.gif'

export function RowLoader() {
  const {
    daoConfig: { name },
  } = useNounishAuctionProvider()

  return (
    <Flex className={[rowLoader]}>
      {name ? (
        <Box
          as="img"
          src={name === 'LilNoun' ? lilLoader : nounLoader}
          w="100%"
          h="100%"
          inset="x0"
          objectFit="cover"
        />
      ) : (
        <Icon id="Spinner" size="lg" />
      )}
    </Flex>
  )
}
