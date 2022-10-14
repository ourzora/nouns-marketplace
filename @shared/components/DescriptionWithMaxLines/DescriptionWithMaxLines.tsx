import { Button } from 'components/Button'

import { useMemo } from 'react'

import { ModalComposition } from '@modal'
import { Box, BoxProps, Heading, Paragraph, Stack } from '@zoralabs/zord'

import * as styles from './DescriptionWithMaxLines.css'

interface MaxLinesProps extends BoxProps {
  baseLineheight: number
  maxLines: number
  paragraphClassName?: string
}

export function DescriptionWithMaxLines({
  baseLineheight = 30, // 2 lines @ 30px
  maxLines = 2, // 2 lines @ 30px
  paragraphClassName,
  className,
  children,
}: MaxLinesProps) {
  const initialHeight = useMemo(
    () => baseLineheight * maxLines,
    [baseLineheight, maxLines]
  )
  return (
    <Box
      pos="relative"
      className={[className]}
      style={{ height: `${initialHeight}px` }}
      overflow="hidden"
    >
      <Paragraph as="p" size="lg" inline color="text3" className={paragraphClassName}>
        {children}
      </Paragraph>
      <ModalComposition
        className={styles.button}
        modalName={`nft-description`}
        trigger={
          <Button
            pos="absolute"
            bottom="x0"
            right="x0"
            variant="unset"
            size="sm"
            className={styles.button}
            style={{
              padding: '0 8px',
              backgroundColor: 'white',
            }}
          >
            ...more
          </Button>
        }
        content={
          <Stack p="x8" gap="x8">
            <Heading as="h2">Description</Heading>
            <Paragraph
              as="p"
              size="lg"
              inline
              color="text3"
              className={paragraphClassName}
            >
              {children}
            </Paragraph>
          </Stack>
        }
      />
    </Box>
  )
}
