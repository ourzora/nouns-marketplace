import { Box, Flex, Label } from '@zoralabs/zord'
import { Zorb, ZorbProps } from './Zorb'
import { zoraTagline, zoraBrand, poweredByContainer } from './ZoraBrand.css'

export function PoweredByZora({ vertical, ...props }: ZorbProps) {
  return (
    <Flex
      as="a"
      className={poweredByContainer}
      align="center"
      gap="x3"
      mb="x12"
      href="https://zora.co"
      target="_blank"
      rel="noreferrer"
      alignItems="center"
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
