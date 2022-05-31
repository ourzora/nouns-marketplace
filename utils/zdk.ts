import { ZDK } from '@zoralabs/zdk'
import { GALACTUS_BASE_URL } from 'utils/env-vars'

export const zdkAlphaService = new ZDK(GALACTUS_BASE_URL)
