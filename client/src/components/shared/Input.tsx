import { cn } from '../../lib/utils.ts'

type InputPropType = {
  placeholder: string
  type: string
}

export default function Input({ placeholder, type }: InputPropType) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={cn([
        'w-full py-3 px-4 my-2',
        'text-black text-md',
        'rounded-3xl border border-option-2',
      ])}
    />
  )
}
