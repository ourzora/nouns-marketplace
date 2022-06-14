import { Flex, Label } from '@zoralabs/zord'
import { Zorb, ZorbProps } from './Zorb'
import { zoraTagline, zoraBrand } from './ZoraBrand.css'

export function PoweredByZora({ ...props }: ZorbProps) {
  return (
    <Flex
      as="a"
      align="center"
      gap="x3"
      href="https://zora.co"
      target="_blank"
      rel="noreferrer"
    >
      <Flex gap="x1">
        <Label size="lg" className={[zoraTagline, 'light-font']}>
          Powered by
        </Label>
        <Label size="lg" textTransform="uppercase" className={zoraBrand}>
          Zora
        </Label>
      </Flex>
      <Zorb {...props} />
    </Flex>
  )
}
