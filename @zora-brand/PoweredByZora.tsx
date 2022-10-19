import { Flex, Label } from '@zoralabs/zord'

import { poweredByContainer, zoraBrand, zoraTagline } from './ZoraBrand.css'
import { Zorb, ZorbProps } from './Zorb'

export function PoweredByZora({ vertical, ...props }: ZorbProps) {
  return (
    <Flex
      as="a"
      className={poweredByContainer}
      align="center"
      gap="x3"
      href="https://zora.co"
      target="_blank"
      rel="noreferrer"
    >
      <Zorb {...props} size={50} />
      <Flex>
        <Label size="lg" className={zoraTagline}>
          Powered by
        </Label>
        <Label size="lg" textTransform="uppercase" className={zoraBrand}>
          Zora
        </Label>
      </Flex>
    </Flex>
  )
}
