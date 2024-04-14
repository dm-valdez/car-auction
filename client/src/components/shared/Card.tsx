import { ReactNode } from 'react'

type CardPropType = {
  children: ReactNode
}

export default function Card({ children }: CardPropType) {
  return (
    <div className={'w-[450px] py-12 px-6 rounded-3xl shadow-3xl'}>
      {children}
    </div>
  )
}
