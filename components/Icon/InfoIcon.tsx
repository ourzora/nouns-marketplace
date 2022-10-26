import React from 'react'

import { Flex, FlexProps } from '@zoralabs/zord'

import * as styles from './InfoIcon.css'

export interface IconProps extends FlexProps {}

export function InfoIcon({ id, ...props }: IconProps) {
  return (
    <Flex {...props} className={[styles.infoIcon, props.className]}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2227_10758)">
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="#B3B3B3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8H12.01"
            stroke="#B3B3B3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 12H12V16H13"
            stroke="#B3B3B3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2227_10758">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Flex>
  )
}
