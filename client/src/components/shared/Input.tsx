import React from 'react'
import { cn } from '../../lib/utils.ts'

type InputPropType = {
  placeholder: string
  type: string
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function Input({ placeholder, type, value, onChange, name, className }: InputPropType) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={cn([
        'w-full py-3 px-4 my-2',
        'text-black text-md',
        'rounded-3xl border border-option-2',
        className
      ])}
    />
  )
}
