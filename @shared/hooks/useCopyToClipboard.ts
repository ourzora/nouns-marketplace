import { useCallback, useEffect, useState } from 'react'

export enum CopyStatus {
  INACTIVE = 'INACTIVE',
  COPIED = 'COPIED',
  FAILED = 'FAILED',
}

export const useCopyToClipboard = (
  text: string,
  notice = 1000
): [CopyStatus, boolean, () => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(CopyStatus.INACTIVE)
  const copied = copyStatus === CopyStatus.COPIED

  useEffect(() => {
    if (copyStatus === CopyStatus.INACTIVE) {
      return
    }

    const timeoutId = setTimeout(() => setCopyStatus(CopyStatus.INACTIVE), notice)

    return () => clearTimeout(timeoutId)
  }, [copyStatus, notice])

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus(CopyStatus.COPIED),
      () => setCopyStatus(CopyStatus.FAILED)
    )
  }, [text])

  return [copyStatus, copied, copy]
}
