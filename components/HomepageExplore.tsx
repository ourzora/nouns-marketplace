import { Flex, Label } from '@zoralabs/zord'

import { Link } from './Link'

export function HomepageExplore() {
  return (
    <Flex w="100%" justify="center">
      <Link href="/collections">
        <Flex
          align="center"
          borderRadius="curved"
          backgroundColor="background2"
          m="auto"
          px="x6"
        >
          <Label
            py={{
              '@initial': 'x1',
              '@1024': 'x2',
            }}
            as="span"
            size="lg"
            color="text2"
          >
            Explore
          </Label>
        </Flex>
      </Link>
    </Flex>
  )
}
