import { Flex, FlexProps, Label } from '@zord'

import { poweredByContainer, zoraBrand } from './ZoraBrand.css'
import { Zorb } from './Zorb'

interface PoweredByProps extends FlexProps {
  size?: number
}

export function PoweredByZora({ size = 32, className, ...props }: PoweredByProps) {
  return (
    <Flex
      as="a"
      className={[poweredByContainer, className]}
      align="center"
      justify="center"
      gap="x3"
      href="https://zora.co"
      target="_blank"
      rel="noreferrer"
    >
      <Label size="lg" textTransform="uppercase" className={zoraBrand}>
        Made with
      </Label>
      <Zorb size={size} />
      <Label size="lg" textTransform="uppercase" className={zoraBrand}>
        on Ethereum
      </Label>
    </Flex>
  )
}
