import { cn } from '../../lib/utils.ts'

type ButtonPropType = {
  title: string
  type?: 'submit' | 'reset' | 'button' | undefined
  onClick?: () => void
}

export default function Button({ title = 'BUTTON', type, onClick }: ButtonPropType) {
  return (
    <button
      className={cn([
        'w-full p-4 my-2 text-lg bg-option-3 rounded-full',
        'hover:bg-option-4',
      ])}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
