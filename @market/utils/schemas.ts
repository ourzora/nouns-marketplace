import * as Yup from 'yup'

export const reserveBidSchema = Yup.object().shape({
  amount: Yup.string().required('Bid amount is a required value'),
})

export const reservePriceSchema = Yup.object().shape({
  currency: Yup.object().required(),
  amount: Yup.number().required('Minimum bid price is a required value'),
})

export const fixedPriceSchema = Yup.object().shape({
  currency: Yup.object().required(),
  amount: Yup.number().required('List price is a required value'),
  // platformFee: Yup.number().optional(), // TODO: Check naming
  listingFeePercentage: Yup.number().optional(),
  findersFeeBps: Yup.number().min(0).max(10),
})

export const reservePriceUpdateSchema = Yup.object().shape({
  amount: Yup.string().required('Reserve price is a required value'),
})

const DURATION_MESSAGE = 'Duration must be between 1 and 10'

export const reserveDurationSchema = Yup.object().shape({
  duration: Yup.number()
    .required('Duration is a required value')
    .min(1, DURATION_MESSAGE)
    .max(10, DURATION_MESSAGE),
})
