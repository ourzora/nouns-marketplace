import { LooksRareIcon, OpenSeaIcon, X2Y2Icon } from 'components/Icon'

// Selective order attribution for orders created from a small subset of NFT platforms
// See spec: https://opensea.notion.site/opensea/Seaport-Order-Attributions-ec2d69bf455041a5baa490941aad307f
export function useOffchainOrderAttribution(salt: string, calldata?: string) {
  // Tags created by truncating first 4 bytes of keccak'd domain, per spec
  // ex: input opensea.io at https://keccak-256.4tools.net/ -> 360c6ebe208d6ffcaecea617ba67ec8cb7f2d24b8e92722246101f69f05f6ba7
  const platformTags = ['360c6ebe', 'ad016278', 'c4ac6e7e', '72db8c0b', '1d4da48b']

  const Attributions = {
    '360c6ebe': 'opensea.io',
    ad016278: 'x2y2.io',
    c4ac6e7e: 'looksrare.org',
    // '72db8c0b': 'gem.xyz', // TODO, need logos...
    // '1d4da48b': 'reservoir.tools', // TODO, need logos...
  } as { [index: string]: string }

  let attribution

  platformTags.every((platform) => {
    if (
      salt?.startsWith(platform) || // If domain is passed in b) at order creation, the tag is added to the first 4 bytes of the order salt.
      calldata?.endsWith(platform) // If domain is passed in a) at order fulfillment, the tag is added to the last 4 bytes of fulfillment calldata.
    ) {
      attribution = Attributions[platform]
      return false // Stop iterating when result is found
    }
    return true
  })

  const output = {
    ['seaport']: { logo: OpenSeaIcon, platformName: 'SeaPort', color: '#000000' }, // default
    ['opensea.io']: { logo: OpenSeaIcon, platformName: 'OpenSea', color: '#000000' },
    ['looksrare.org']: {
      logo: LooksRareIcon,
      platformName: 'LooksRare',
      color: '#04CD58',
    },
    ['x2y2.io']: { logo: X2Y2Icon, platformName: 'x2y2', color: '#0DC7F8' },
  }

  const activePlatform = attribution ?? 'seaport'

  return {
    attribution,
    hasAttribution: !!attribution,
    logo: output[activePlatform]['logo'],
    platformName: output[activePlatform]['platformName'],
    platformButtonColor: output[activePlatform]['color'],
  }
}
