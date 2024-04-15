import React from 'react'
import { cn } from '../../lib/utils.ts'

type InputPropType = {
  placeholder: string
  type: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ placeholder, type, value, onChange }: InputPropType) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={cn([
        'w-full py-3 px-4 my-2',
        'text-black text-md',
        'rounded-3xl border border-option-2',
      ])}
    />
  )
}
