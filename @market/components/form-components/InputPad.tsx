import { Flex, FlexProps } from '@zoralabs/zord'

/**
 * A wrapper adds padding between elements in `InputGroup`.
 */

export function InputPad({ className, children, ...props }: FlexProps) {
  return (
    <Flex flexShrink={0} placeItems="center" px="x3" height="100%" {...props}>
      {children}
    </Flex>
  )
}
