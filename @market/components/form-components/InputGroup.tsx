import { Flex, FlexProps } from '@zoralabs/zord'

/**
 * A wrapper for a group of inputs to layout on the same line.
 */

interface InputGroupProps extends FlexProps {}

export function InputGroup({ className, children, ...props }: InputGroupProps) {
  return (
    <Flex
      align="center"
      borderRadius="small"
      gap="x0"
      p="x0"
      width="100%"
      height="x15"
      backgroundColor="tertiary"
      {...props}
    >
      {children}
    </Flex>
  )
}
