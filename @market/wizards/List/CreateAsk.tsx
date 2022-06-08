import { Stack } from '@zoralabs/zord'
import { Dispatch, SetStateAction } from 'react'
import { ListStep } from './List'

export type CreatAskProps = {
  wizardStep: ListStep
  setWizardStep: Dispatch<SetStateAction<ListStep>>
}

export function CreateAsk({ wizardStep, setWizardStep }: CreatAskProps) {
  return <Stack>{wizardStep !== 'Confirmation' && <div>Create Ask</div>}</Stack>
}
