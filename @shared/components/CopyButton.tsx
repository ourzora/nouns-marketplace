import React, { useEffect } from 'react'
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard'
import { mixins, Icon } from '@zoralabs/zord'
import { Button, NounButtonProps } from 'components/Button'

/**
 * Button that copies text to clipboard, handles copy status and state
 */

export interface CopyButtonProps extends NounButtonProps {
  onStatusChange?: (success: boolean) => void
  value: string
}

export function CopyButton({
  className,
  onStatusChange,
  value,
  ...props
}: CopyButtonProps) {
  const [_, copied, handleCopy] = useCopyToClipboard(value)

  useEffect((): void => {
    if (onStatusChange) onStatusChange(copied)
  }, [copied, onStatusChange])

  return (
    <Button
      className={[mixins({ hoverFadeIn: true }), className]}
      variant="unset"
      maxH="x3"
      onClick={handleCopy}
      title="Copy to Clipboard"
      {...props}
    >
      <Icon id="Copy" size="sm" color="text3" />
    </Button>
  )
}
