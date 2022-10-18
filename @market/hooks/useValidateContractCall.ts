import { ZORA_CONTRACT_CALL_VALIDATION_ADDRESS } from '@shared'
import { useEffect, useState } from 'react'

// Validate that offchain orders are still valid
// See: https://docs.zora.co/docs/guides/api-offchain#verifying

// {
//   "caller_address": "YOUR_ADDRESS",
//   "contract_address": "0x00000000006c3852cbef3e08e8df289169ede581", // The contract that fills the orders e.g. Seaport
//   "calldata": "0xfb0f3ee10000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063c8117529600000000000000000000000000025659eefd7cae21566a257420bbcb0c8317ef94f000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c00000000000000000000000000ca21d4228cdcc68d4e23807e5e370c07577dd1520000000000000000000000000000000000000000000000000000000000007c2e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000062e930e10000000000000000000000000000000000000000000000000000000063120f61000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001538739839173460000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000002c0dbbfb370000000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc9000000000000000000000000000000000000000000000000000079968bf2cb000000000000000000000000000d1d1d4e36117ab794ec5d4c78cbd3a8904e691d0000000000000000000000000000000000000000000000000000000000000004169d9d167a41f282ee33134ce0fa3041b458904ad1c85255f712dd6dd10f1ad8c65dd4534f4a5d1f5ee936224bc50fea910864530a3f06e534d89c6c2a1fdb5021b00000000000000000000000000000000000000000000000000000000000000",
//   "value": 0.031 // Price in Ether (Decimals Price)
// }

export type ContractCallValidationData = {
  caller_address: string
  contract_address: string // the contract that fills the orders, eg. Seaport
  calldata: string //
  value: string // Price in Ether (Decimal price)
}

export function useValidateContractCall(contractCallData?: ContractCallValidationData) {
  const [isContractCallValid, setIsContractCallValid] = useState<boolean>(false)

  console.log('contractCallData', contractCallData)

  // if(!contractCallData) return {isValidated: false}

  useEffect(() => {
    const validateContractCall = async () => {
      try {
        console.log('TRYING')

        const rawResponse = await fetch(ZORA_CONTRACT_CALL_VALIDATION_ADDRESS, {
          method: 'POST',
          /* @ts-ignore */
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
          },
          body: JSON.stringify({
            ...contractCallData,
          }),
        })
        const content = await rawResponse.json()

        console.log('CONTENT', content)

        return content
      } catch (err: any) {
        console.log('CATCHING')
        console.error(err.message)
      }
      // finally {
      //   // setIsUpdatingToken(false)
      // }
      // return validated
    }
    validateContractCall()
  }, [contractCallData])

  // const validateContractCall = async (contractCallData: ContractCallValidationData) => {

  //   try {
  //     console.log('TRYING')

  //     const rawResponse = await fetch(
  //       ZORA_CONTRACT_CALL_VALIDATION_ADDRESS,
  //       {
  //         method: 'POST',
  //         /* @ts-ignore */
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
  //         },
  //         body: JSON.stringify({
  //           ...contractCallData
  //         }),
  //       }
  //     )
  //     const content = await rawResponse.json()

  //     console.log('CONTENT', content)

  //     return content

  //   } catch (err: any) {
  //     console.log('CATCHING')
  //     console.error(err.message)
  //   }
  //   // finally {
  //   //   // setIsUpdatingToken(false)
  //   // }
  //   // return validated
  // }

  // const isValidated: Promise<any> = validateContractCall(contractCallData)

  return {
    // isValidated,
    isValidated: isContractCallValid,
  }
}
