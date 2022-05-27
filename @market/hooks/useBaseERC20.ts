import { Signer } from '@ethersproject/abstract-signer'
import { AddressZero } from '@ethersproject/constants'
import { Provider } from '@ethersproject/providers'
import { BaseErc20Factory } from '@zoralabs/core/dist/typechain'
import { BaseErc20 } from '@zoralabs/core/dist/typechain/BaseErc20'

export function useBaseERC20(
  tokenAddress?: string,
  provider?: Signer | Provider
): BaseErc20 | undefined {
  return tokenAddress && provider && tokenAddress !== AddressZero
    ? BaseErc20Factory.connect(tokenAddress, provider)
    : undefined
}
