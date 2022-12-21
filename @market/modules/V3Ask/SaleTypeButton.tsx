import { BoxProps, Button, Flex, Icon, Label, Paragraph, Stack, Tag, Well } from '@zord'

import * as styles from './V3AskFlow.css'

export interface SaleTypeButtonProps extends BoxProps {
  label: string
  description: string
  tag?: string
  onNext?: () => void
}

export function SaleTypeButton({ label, description, tag, onNext }: SaleTypeButtonProps) {
  return (
    <Button
      className={styles.button}
      variant="unset"
      align="center"
      onClick={onNext}
      style={{ height: 'unset!important' }}
    >
      <Well display="grid" className={styles.grid} borderRadius="curved">
        <Stack gap="x1">
          <Flex gap="x2" justify="flex-start" align="flex-start">
            <Label align="left">{label}</Label>
            {tag && <Tag className={styles.offsetY}>{tag}</Tag>}
          </Flex>
          <Paragraph className={styles.textColor} size="sm" align="left">
            {description}
          </Paragraph>
        </Stack>

        <Flex w="x13" justify="flex-end" align="center">
          <Icon id="ChevronRight" color="icon2" size="md" />
        </Flex>
      </Well>
    </Button>
  )
}
