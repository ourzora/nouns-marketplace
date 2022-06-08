import { CardMarketTrigger } from './CardMarketTrigger'

/* Idea here is that there could be a modal to update listing */

export function ManageOwnedToken() {
  return (
    <CardMarketTrigger
      cta="On Sale"
      backgroundColor="primary"
      border="tertiary"
      color="tertiary"
    />
  )
}
