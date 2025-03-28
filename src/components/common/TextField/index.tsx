import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'

export interface TextfieldInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  label?: string | React.ReactNode
  error?: string | boolean
  helperText?: string
  boldLabel?: boolean
  labelColor?: string
  gap?: string
  paddingRight?: string
  isError?: boolean
  unit?: string
  isLengthShow?: boolean
}

const TextField = React.forwardRef<HTMLInputElement, TextfieldInputProps>(
  (
    {
      label,
      gap = '8',
      startIcon,
      endIcon,
      disabled,
      error,
      boldLabel,
      isError,
      labelColor,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(`flex w-full flex-col gap-[${gap}px]`)}>
        {label && (
          <div
            className={cn(
              'text-left text-[14px] font-medium leading-5 tracking-[-0.16px] text-blue-darksteel',
              boldLabel && 'font-medium',
              labelColor && `text-[${labelColor}]`,
            )}
          >
            {label}
          </div>
        )}
        <Input
          error={error}
          disabled={disabled}
          isError={isError}
          ref={ref}
          {...props}
          startIcon={startIcon}
          endIcon={endIcon}
        />
      </div>
    )
  },
)
TextField.displayName = 'Input'

export default TextField
