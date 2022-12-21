import React from 'react'

import { Flex, FlexProps } from '@zord'

interface IconProps extends FlexProps {}

export function ArrowRight({ id, className, ...props }: IconProps) {
  return (
    <Flex {...props} className={className}>
      <svg
        width="16"
        height="13"
        viewBox="0 0 16 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M8.1809 12.6031C8.42469 12.8468 8.75529 12.9837 9.1 12.9837C9.44471 12.9837 9.77531 12.8468 10.0191 12.6031L15.2191 7.40313C15.4628 7.15934 15.5997 6.82874 15.5997 6.48403C15.5997 6.13931 15.4628 5.80871 15.2191 5.56493L10.0191 0.364926C9.77392 0.12812 9.44554 -0.0029128 9.10468 4.91432e-05C8.76382 0.00301109 8.43777 0.139731 8.19674 0.380762C7.95571 0.621792 7.81899 0.947848 7.81603 1.2887C7.81306 1.62956 7.9441 1.95794 8.1809 2.20313L11.1618 5.18403H1.3C0.955219 5.18403 0.624559 5.32099 0.380762 5.56479C0.136965 5.80859 9.53674e-07 6.13925 9.53674e-07 6.48403C9.53674e-07 6.82881 0.136965 7.15947 0.380762 7.40326C0.624559 7.64706 0.955219 7.78403 1.3 7.78403H11.1618L8.1809 10.7649C7.93719 11.0087 7.80028 11.3393 7.80028 11.684C7.80028 12.0287 7.93719 12.3593 8.1809 12.6031Z"
        />
      </svg>
    </Flex>
  )
}
