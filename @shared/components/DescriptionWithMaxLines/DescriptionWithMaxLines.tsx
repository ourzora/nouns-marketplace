import { useMemo } from 'react'

import { ModalComposition } from '@modal'
import { Box, BoxProps, Button, Heading, Paragraph, Stack } from '@zord'

import * as styles from './DescriptionWithMaxLines.css'

interface MaxLinesProps extends BoxProps {
  baseLineheight: number
  maxLines: number
  paragraphClassName?: string
  description: string
}

export function DescriptionWithMaxLines({
  baseLineheight = 30, // 2 lines @ 30px
  maxLines = 2, // 2 lines @ 30px
  paragraphClassName,
  className,
  description,
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
      <Paragraph inline color="text3" className={paragraphClassName}>
        {description}
      </Paragraph>
      <ModalComposition
        className={styles.button}
        modalName={`nft-description`}
        trigger={
          description.length > 64 ? (
            <Button
              pos="absolute"
              bottom="x0"
              right="x0"
              display="block"
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
          ) : (
            <></>
          )
        }
        content={
          <Stack p="x8" gap="x8">
            <Heading as="h2">Description</Heading>
            <Paragraph inline color="text3" className={paragraphClassName}>
              {description}
            </Paragraph>
          </Stack>
        }
      />
    </Box>
  )
}
