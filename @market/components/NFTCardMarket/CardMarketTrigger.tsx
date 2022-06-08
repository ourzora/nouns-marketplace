import { Heading, HeadingProps } from '@zoralabs/zord'

interface TriggerProps extends HeadingProps {
  cta: string
}

export function CardMarketTrigger({ cta, ...props }: TriggerProps) {
  return (
    <Heading
      px="x6"
      py="x2"
      mt="x2"
      as="span"
      size="xs"
      color="primary"
      borderRadius="curved"
      backgroundColor="tertiary"
      {...props}
    >
      {cta}
    </Heading>
  )
}
