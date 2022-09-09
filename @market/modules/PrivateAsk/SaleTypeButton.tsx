import {
  Flex,
  Label,
  Stack,
  BoxProps,
  Button,
  Well,
  Tag,
  Paragraph,
  Icon,
} from '@zoralabs/zord'
import * as styles from './PrivateAskFlow.css'

export interface SaleTypeButtonProps extends BoxProps {
  label: string
  description: string
  tag?: string
  onNext?: () => void
}

export function SaleTypeButton({ label, description, tag, onNext }: SaleTypeButtonProps) {
  return (
    <Button className={styles.button} variant="unset" align="center" onClick={onNext}>
      <Well display="grid" className={styles.grid}>
        <Stack gap="x1">
          <Flex gap="x2" justify="flex-start" align="flex-start">
            <Label align="left">{label}</Label>
            <Tag className={styles.offsetY}>{tag}</Tag>
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
