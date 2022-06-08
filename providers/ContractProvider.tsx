import { createContext, useContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { useContractRead } from 'wagmi'

export type ContractProps = {
  contractAddress: string
  abi: any[]
  children: ReactNode
}

const ContractContext = createContext<{
  contractURIData: any
  error: any
}>({
  contractURIData: undefined,
  error: undefined,
})

export function useContractProvider() {
  return useContext(ContractContext)
}

export function ContractProvider({ contractAddress, abi, children }: ContractProps) {
  const [contractUriData, setContractUriData] = useState<any>(undefined)

  const { data, error, isError } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: abi,
    },
    'contractURI'
  )

  useEffect(() => {
    if (data) {
      /* @ts-ignore */
      fetch(data)
        .then((response) => response.json())
        .then((data) => {
          setContractUriData(data)
        })
    }
  }, [data, error, isError])

  return (
    <ContractContext.Provider
      value={{
        contractURIData: contractUriData,
        error: error,
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}
