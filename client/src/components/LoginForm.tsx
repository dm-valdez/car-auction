import Input from './shared/Input.tsx'
import Button from './shared/Button.tsx'
import Card from './shared/Card.tsx'
import { useState, FormEvent, ChangeEvent } from 'react'
import { validateFields } from '../lib/utils.ts'
import useLogin from '../hooks/useLogin.ts'
import { useNavigate } from 'react-router-dom'
export default function LoginForm() {
  const [ emailAddress, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ errors, setErrors ] = useState<{ [key: string]: string }>({})

  const navigate = useNavigate()
  const login = useLogin()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validateFields({
      email: {
        value: emailAddress,
        rules: [
          { type: 'required', message: 'Email is required.' },
          { type: 'email', message: 'Invalid email format.' },
        ],
      },
      password: {
        value: password,
        rules: [
          { type: 'required', message: 'Password is required.' },
          { type: 'minLength', message: 'Password must be at least 6 characters longs.', minLength: 6 },
        ],
      },
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    await login.mutateAsync({ emailAddress, password })
    navigate('/auctions')
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setErrors({ ...errors, email: '' })
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setErrors({ ...errors, password: '' })
  }

  return (
    <Card>
      <h1 className={'mb-2 ml-2 text-option-3 text-xl font-medium'}>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input placeholder={'Email'} type={'text'} value={emailAddress} onChange={handleEmailChange} />
        {errors.email && <p className={'m1-2 ml-2 text-option-6 text-xs font-medium'}>{errors.email}</p>}
        <Input placeholder={'Password'} type={'password'} value={password} onChange={handlePasswordChange} />
        {errors.password && <p className={'m1-2 ml-2 text-option-6 text-xs font-medium'}>{errors.password}</p>}
        <Button title={'LOGIN'} type={'submit'} />
      </form>
    </Card>
  )
}
