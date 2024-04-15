import LoginForm from '../components/LoginForm.tsx'
import RegisterForm from '../components/RegisterForm.tsx'
import { cn } from '../lib/utils.ts'
import { useState } from 'react'

export default function HomePage() {
  const [ loginForm, setLoginForm ] = useState<boolean>(true)

  return (
    <main className={'flex flex-col justify-center items-center py-28'}>
      {loginForm ? <LoginForm /> : <RegisterForm setLoginForm={setLoginForm} />}
      <div className={'flex gap-x-2'}>
        <p className={'text-option-2 text-sm font-medium my-3'}>
          {loginForm ? 'New member?' : 'Already have an account?'}
        </p>
        <p
          className={cn([
            'my-3 cursor-pointer',
            'text-option-3 text-sm font-medium',
            'hover:text-option-4 hover:underline hover:underline-offset-2',
          ])}
          onClick={() => setLoginForm(!loginForm)}
        >
          {loginForm ? 'Register' : 'Login'}
        </p>
      </div>
    </main>
  )
}
