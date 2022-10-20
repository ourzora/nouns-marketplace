import { APP_TITLE } from 'utils/env-vars'

import { NOUNS_GLASSES } from 'styles/style-constants'

import { Box, BoxProps } from '@zoralabs/zord'

import { nounsGlasses } from './NounsGlasses.css'

interface NounsGlassesProps extends BoxProps {}

export function NounsGlasses({ ...props }: NounsGlassesProps) {
  return (
    <Box
      as="img"
      className={[nounsGlasses]}
      src={NOUNS_GLASSES}
      alt={APP_TITLE}
      {...props}
    />
  )
}
