import { Heading, HeadingProps } from '@zoralabs/zord'
import { buttonStyle } from '@market/components/MarketComponents.css'

interface TriggerProps extends HeadingProps {
  cta: string
}

export function CardMarketTrigger({ cta, ...props }: TriggerProps) {
  return (
    <Heading
      px="x6"
      py="x2"
      as="span"
      size="xs"
      color="primary"
      borderRadius="curved"
      className={[buttonStyle, 'zora-market-cardMarketTrigger']}
      {...props}
    >
      {cta}
    </Heading>
  )
}
