'use client'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { useState } from 'react'
import { Icon } from '@iconify/react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  error?: string | boolean
  isError?: boolean
  disabled?: boolean
  maxLength?: number
  isLengthShow?: boolean
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      isPassword,
      startIcon,
      endIcon,
      error,
      isError,
      className,
      disabled,
      maxLength,
      isLengthShow,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(!isPassword)
    const togglePasswordVisibility = () => setShowPassword(!showPassword)
    return (
      <>
        {disabled ? (
          <div
            style={{
              border: !isError ? '1px solid #D0D5DD' : '1px solid #F04438',
              borderRadius: '6px',
              background: !isError ? '#F2F4F7' : 'none',
              height: '40px',
              color: 'rgba(16, 24, 40, 0.64)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              display: 'flex',
              alignItems: 'center',
              // paddingRight: paddingRight,
            }}
            className='h-10 rounded-[6px] border cursor-not-allowed border-[#D0D5DD] bg-grey-600  px-[12px] py-[6px]'
          >
            <div className='flex w-full justify-between'>
              <span className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                {props.value}
              </span>
              {endIcon && (
                <div className={cn('ml-auto flex cursor-pointer items-center')}>
                  {endIcon}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'active: flex h-[40px] w-full rounded-[6px] border border-solid border-[#D0D5DD] bg-transparent px-[16px] py-[8px] text-[16px] shadow-sm placeholder:text-muted-foreground focus-within:border-[1.6px] focus-within:!border-[#334155] hover:border-[#667085] focus-visible:outline-none',
              className,
              disabled
                ? 'cursor-not-allowed bg-[#F9FAFB] outline  outline-grey-400'
                : '',
              error
                ? '!border-[#F04438] !border focus-within:!border-[#F04438]'
                : '',
            )}
          >
            {startIcon && (
              <div className={cn('flex cursor-pointer items-center pr-2')}>
                {startIcon}
              </div>
            )}
            <input
              disabled={disabled}
              type={isPassword && !showPassword ? 'password' : 'text'}
              className='w-full text-ellipsis text-base text-[#1D2939] outline-none disabled:cursor-not-allowed'
              ref={ref}
              maxLength={maxLength}
              {...props}
            />

            {isPassword && (
              <div
                className='text-gray-400 absolute inset-y-0 right-3 flex cursor-pointer select-none items-center'
                onClick={togglePasswordVisibility}
              >
                <Icon
                  icon={showPassword ? 'iconamoon:eye' : 'iconamoon:eye-off'}
                  className='h-4 w-4 text-cool-gray'
                />
              </div>
            )}

            {isLengthShow && (
              <div className='flex items-center border-l px-2 text-[#20222480] border-[#20222480]'>
                {`${props.value?.toString().length || 0}/${maxLength}`}
              </div>
            )}

            {endIcon && (
              <div className={cn('flex cursor-pointer items-center')}>
                {endIcon}
              </div>
            )}
          </div>
        )}
        {error && (
          <div className='animate-shake text-left !text-[14px] text-xs text-[#F04438]'>
            {error}
          </div>
        )}
      </>
    )
  },
)

Input.displayName = 'Input'
export { Input }
