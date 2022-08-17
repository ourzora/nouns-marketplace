import { CopyStatus, useCopyToClipboard } from '@shared/hooks'
import { mixins, Button, ButtonProps, Icon } from '@zoralabs/zord'
import React, { useEffect } from 'react'

/**
 * Button that copies text to clipboard, handles copy status and state
 */

export interface CopyButtonProps extends ButtonProps {
  onStatusChange?: (success: boolean) => void
  value: string
}

export function CopyButton({
  className,
  onStatusChange,
  value,
  ...props
}: CopyButtonProps) {
  const [status, handleCopy] = useCopyToClipboard(value)

  useEffect((): void => {
    if (onStatusChange) onStatusChange(status === CopyStatus.COPIED)
  }, [onStatusChange, status])

  return (
    <Button
      className={[mixins({ hoverFadeIn: true }), className]}
      variant="unset"
      maxH="x3"
      onClick={handleCopy}
      title="Copy to Clipboard"
      {...props}
    >
      <Icon id="Copy" size="sm" color="tertiary" />
    </Button>
  )
}
