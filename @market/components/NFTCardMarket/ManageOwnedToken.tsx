import { CardMarketTrigger } from './CardMarketTrigger'

/* Idea here is that there could be a modal to update listing */

export function ManageOwnedToken() {
  return (
    <CardMarketTrigger
      cta="On Sale"
      backgroundColor="primary"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      color="tertiary"
    />
  )
}
