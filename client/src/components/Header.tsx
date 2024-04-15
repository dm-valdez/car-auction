import { GetUserAuthStatusResponse } from '../lib/types.ts'

type HeaderPropType = {
  authStatus: GetUserAuthStatusResponse | undefined
  logout: () => void
}

export default function Header({ authStatus, logout }: HeaderPropType) {
  return (
    <header className={'bg-option-3 py-6 px-12 flex justify-between'}>
      <h1 className={'text-3xl font-medium tracking-tighter'}>CAR AUCTION</h1>
      {authStatus?.isLoggedIn && (
        <h2 className={'text-lg font-medium'}>
          Welcome, {authStatus.user.full_name} | <span className={' cursor-pointer hover:underline hover:underline-offset-2'}
                                onClick={logout}>Logout</span>
        </h2>
      )}
    </header>
  )
}
