import Input from './shared/Input.tsx'
import Button from './shared/Button.tsx'
import Card from './shared/Card.tsx'
import { useState, FormEvent, ChangeEvent } from 'react'
import { validateFields } from '../lib/utils.ts'
import useLogin from '../hooks/useLogin.ts'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [ formData, setFormData ] = useState<{ emailAddress: string, password: string }>({
    emailAddress: '',
    password: '',
  })
  const [ errors, setErrors ] = useState<{ [key: string]: string }>({})

  const navigate = useNavigate()
  const login = useLogin()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validateFields({
      email: {
        value: formData.emailAddress,
        rules: [
          { type: 'required', message: 'Email is required.' },
          { type: 'email', message: 'Invalid email format.' },
        ],
      },
      password: {
        value: formData.password,
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

    await login.mutateAsync(formData)
    navigate('/auctions')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
    setErrors({ ...errors, [name]: '' })
  }


  return (
    <Card>
      <h1 className={'mb-2 ml-2 text-option-3 text-xl font-medium'}>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder={'Email'}
          type={'text'}
          name={'emailAddress'}
          value={formData.emailAddress}
          onChange={handleChange}
        />
        {errors.email && <p className={'m1-2 ml-2 text-option-6 text-xs font-medium'}>{errors.email}</p>}
        <Input
          placeholder={'Password'}
          type={'password'}
          name={'password'}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className={'m1-2 ml-2 text-option-6 text-xs font-medium'}>{errors.password}</p>}
        <Button title={'LOGIN'} type={'submit'} />
      </form>
    </Card>
  )
}
