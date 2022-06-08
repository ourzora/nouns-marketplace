/* If user connects wallet and they are the creator/owner of the contract Then give them a manage page... maybe different or more features. */
import { useState, useEffect } from 'react'

export const useContractABI = (contractAddress: string) => {
  const [contractABI, setContractABI] = useState<any>(undefined)

  useEffect(() => {
    fetch(`https://ether.actor/${contractAddress}.json`)
      .then((response) => response.json())
      .then((data) => {
        setContractABI(data.abi)
      })
  }, [])

  return {
    contractABI,
  }
}
