import { Icon, IconProps } from '@zoralabs/zord'

export function SuccessCheckmark({ ...props }: IconProps) {
  return (
    <Icon
      id="Check"
      size="xl"
      borderRadius="round"
      color="onPositive"
      backgroundColor="positive"
      p="x3"
      alignSelf="center"
      {...props}
    />
  )
}
