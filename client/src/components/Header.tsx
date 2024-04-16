import { GetUserAuthStatusResponse } from '../lib/types.ts'
import { cn } from '../lib/utils.ts'

type HeaderPropType = {
  authStatus: GetUserAuthStatusResponse | undefined
  logout: () => void
}

export default function Header({ authStatus, logout }: HeaderPropType) {
  return (
    <header className={'bg-option-3 py-6 px-12 flex justify-between'}>
      <h1 className={cn([
        'text-2xl font-medium tracking-tighter',
        'md:text-3xl font-medium tracking-tighter',
      ])}>CAR AUCTION</h1>
      {authStatus?.isLoggedIn && (
        <h2 className={'mt-1 text-md font-medium md:text-lg'}>
          <span className={'invisible sm:visible'}>Welcome, {authStatus.user.full_name} |</span> <span className={'cursor-pointer hover:underline hover:underline-offset-2'}
                                onClick={logout}>Logout</span>
        </h2>
      )}
    </header>
  )
}
