'use client'
import { cn } from '@/lib/utils'
import { HTMLProps, forwardRef } from 'react'
interface TypographyProps extends HTMLProps<HTMLDivElement> {
  label: string
  underline?: boolean
  fontWeight?: number
  color?: string
  isGradient?: boolean
}
const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (
    {
      label,
      underline = false,
      size = 16,
      fontWeight = 400,
      color = '#202224',
      className,
      onClick,
      isGradient = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          className,
          underline && 'underline',
          isGradient && 'gradient-text',
        )}
        style={{
          color: color,
          fontSize: size,
          fontWeight: fontWeight,
        }}
        onClick={onClick}
        {...props}
      >
        {label}
      </div>
    )
  },
)

Typography.displayName = 'Typography'

export default Typography
