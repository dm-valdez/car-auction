import { cn } from '../../lib/utils.ts'

type ButtonPropType = {
  title: string
}

export default function Button({ title = 'BUTTON' }: ButtonPropType) {
  return (
    <button className={cn([
      'w-full p-4 my-2 text-lg bg-option-3 rounded-full',
      'hover:bg-option-4'
    ])}>
      {title}
    </button>
  )
}
