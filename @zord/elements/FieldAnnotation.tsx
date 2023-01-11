import React, { ReactNode } from 'react'

import { annotation, annotationText } from './FieldAnnotation.css'
import { Flex, FlexProps } from './Flex'
import { Text, textVariants } from './Text'

export interface FieldAnnotationProps extends FlexProps {
  error?: string
  description?: string | ReactNode
  indentFields?: boolean
  variant?: keyof typeof textVariants['variant']
}

export function FieldAnnotation({
  description,
  error,
  className,
  indentFields = true,
  variant = 'paragraph-sm',
  ...props
}: FieldAnnotationProps) {
  return (
    <Flex className={['zord-fieldannotation', annotation, className]} {...props}>
      <Text
        className={annotationText({ error: !!error, indentFields: !!indentFields })}
        variant={variant}
      >
        {error || description}
      </Text>
    </Flex>
  )
}
