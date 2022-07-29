import { Box, BoxProps } from '@zoralabs/zord'
import { useCallback, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const placeHolder = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjA5QTkyRjlCMzhGMTFFQzhBRDFDMkFCOUM1QkFGQTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjA5QTkyRkFCMzhGMTFFQzhBRDFDMkFCOUM1QkFGQTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMDlBOTJGN0IzOEYxMUVDOEFEMUMyQUI5QzVCQUZBMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMDlBOTJGOEIzOEYxMUVDOEFEMUMyQUI5QzVCQUZBMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PipMeMMAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAADElEQVR42mJgAAgwAAACAAFPbVnhAAAAAElFTkSuQmCC`

export interface ImageElementProps extends BoxProps {
  src: string
}

export function ImageElement({ src, ...props }: ImageElementProps) {
  const [loaded, setLoaded] = useState(false)

  const loadedHandler = useCallback((e) => {
    if (e.target.src !== placeHolder) setLoaded(true)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0,
  })

  return (
    <Box
      {...props}
      as="img"
      ref={ref}
      src={inView ? src : placeHolder}
      onLoad={loadedHandler}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 150ms ease-in',
      }}
    />
  )
}
