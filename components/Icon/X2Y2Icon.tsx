import React from 'react'

import { Flex, FlexProps } from '@zord'

interface IconProps extends FlexProps {}

export function X2Y2Icon({ id, className, ...props }: IconProps) {
  return (
    <Flex {...props} className={className}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="16" fill="white" />
        <path
          d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z"
          fill="white"
        />
        <path
          d="M26.1742 8.21836C24.2129 6.30183 21.5298 5.12068 18.5709 5.12068C12.5621 5.12068 7.69094 9.9918 7.69094 16.0007C7.69094 22.0096 12.5621 26.8807 18.5709 26.8807C21.5298 26.8807 24.2129 25.6996 26.1742 23.783C23.8346 26.8337 20.1525 28.8007 16.0109 28.8007C8.94166 28.8007 3.21094 23.07 3.21094 16.0007C3.21094 8.9314 8.94166 3.20068 16.0109 3.20068C20.1525 3.20068 23.8346 5.16764 26.1742 8.21836Z"
          fill="url(#paint0_linear_2430_13777)"
        />
        <path
          d="M10.418 22.2254C11.9871 23.7586 14.1335 24.7035 16.5006 24.7035C21.3077 24.7035 25.2046 20.8066 25.2046 15.9995C25.2046 11.1924 21.3077 7.29552 16.5006 7.29552C14.1335 7.29552 11.9871 8.24039 10.418 9.77359C12.2896 7.33308 15.2353 5.75952 18.5486 5.75952C24.204 5.75952 28.7886 10.3442 28.7886 15.9995C28.7886 21.6549 24.204 26.2395 18.5486 26.2395C15.2353 26.2395 12.2896 24.6659 10.418 22.2254Z"
          fill="url(#paint1_linear_2430_13777)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.6881 16.0001C23.6881 20.2416 20.2496 23.6801 16.0081 23.6801C11.7666 23.6801 8.32812 20.2416 8.32812 16.0001C8.32812 11.7585 11.7666 8.32007 16.0081 8.32007C20.2496 8.32007 23.6881 11.7585 23.6881 16.0001ZM21.1281 16.0001C21.1281 18.8278 18.8358 21.1201 16.0081 21.1201C13.1804 21.1201 10.8881 18.8278 10.8881 16.0001C10.8881 13.1724 13.1804 10.8801 16.0081 10.8801C18.8358 10.8801 21.1281 13.1724 21.1281 16.0001Z"
          fill="url(#paint2_linear_2430_13777)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2430_13777"
            x1="3.21094"
            y1="15.5593"
            x2="28.8109"
            y2="15.5593"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00E0FF" />
            <stop offset="1" stopColor="#562EC8" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2430_13777"
            x1="3.18862"
            y1="15.5582"
            x2="28.7886"
            y2="15.5582"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00E0FF" />
            <stop offset="1" stopColor="#562EC8" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2430_13777"
            x1="3.20813"
            y1="15.5587"
            x2="28.8081"
            y2="15.5587"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00E0FF" />
            <stop offset="1" stopColor="#562EC8" />
          </linearGradient>
        </defs>
      </svg>
    </Flex>
  )
}
