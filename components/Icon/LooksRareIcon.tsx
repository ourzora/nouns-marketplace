import React from 'react'

import { Flex, FlexProps } from '@zord'

interface IconProps extends FlexProps {}

export function LooksRareIcon({ id, className, ...props }: IconProps) {
  return (
    <Flex {...props} className={className}>
      <svg
        fill="none"
        height="32"
        viewBox="0 0 32 32"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="#04cd58" height="32" rx="16" width="32" />
        <g clipRule="evenodd" fill="#fff" fillRule="evenodd">
          <path d="m16 17.4c-1.8309 0-3.3158-1.4618-3.3158-3.2667 0-1.8048 1.4849-3.2666 3.3158-3.2666s3.3158 1.4618 3.3158 3.2666c0 1.8049-1.4849 3.2667-3.3158 3.2667zm-1.4416-3.2667c0 .7848.6458 1.4203 1.4416 1.4203s1.4416-.6355 1.4416-1.4203c0-.7847-.6458-1.4203-1.4416-1.4203s-1.4416.6356-1.4416 1.4203z" />
          <path d="m7 14.2239 5.3514-5.2239h7.2973l5.3513 5.2239-9 8.7761zm13.1351-1.9019c-2.2743-2.2278-5.9959-2.2278-8.2702 0l-1.94598 1.8984 1.94598 1.8983c2.2743 2.2278 5.9959 2.2278 8.2702 0l1.946-1.8983z" />
        </g>
      </svg>
    </Flex>
  )
}
