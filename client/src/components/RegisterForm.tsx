import Input from './shared/Input.tsx'
import Button from './shared/Button.tsx'
import Card from './shared/Card.tsx'
import { ChangeEvent, FormEvent, useState } from 'react'
import { validateFields } from '../lib/utils.ts'
import useRegister from '../hooks/useRegister.ts'
import { toast } from 'react-toastify'

type RegisterFormPropType = {
  setLoginForm: (value: boolean) => void
}

export default function RegisterForm({ setLoginForm }: RegisterFormPropType) {
  const [ formData, setFormData ] = useState<{
    fullName: string
    emailAddress: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string
  }>({
    fullName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  })
  const [ errors, setErrors ] = useState<{ [key: string]: string }>({})

  const register = useRegister()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validateFields({
      name: {
        value: formData.fullName,
        rules: [
          { type: 'required', message: 'Name is required.' },
        ],
      },
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
      confirmPassword: {
        value: formData.confirmPassword,
        rules: [
          { type: 'required', message: 'Confirm Password is required.' },
          { type: 'matchField', message: 'Passwords do not match.', fieldName: 'password' },
        ],
      },
      phoneNumber: {
        value: formData.phoneNumber,
        rules: [
          { type: 'required', message: 'Phone number is required.' },
          { type: 'numeric', message: 'Phone number should be a number.' },
        ],
      },
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    await register.mutateAsync(formData)

    toast.success('All Set! Registration Successful!')

    handleClearForm()
    setLoginForm(true)
  }

  const handleClearForm = () => {
    setFormData({
      fullName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    })
    setErrors({})
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
      <h1 className={'mb-2 ml-2 text-option-3 text-xl font-medium'}>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder={'Name'}
          type={'text'}
          name={'fullName'}
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.name && <p className={'m1-2 ml-2 text-option-6 text-xs font-medium'}>{errors.name}</p>}
        <Input
          placeholder={'Email'}
          type={'email'}
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
        <Input
          placeholder={'Confirm Password'}
          type={'password'}
          name={'confirmPassword'}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className={'m1-2 ml-2 text-option-6 text-xs font-medium'}>{errors.confirmPassword}</p>}
        <Input
          placeholder={'Phone Number'}
          type={'text'}
          name={'phoneNumber'}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className={'m1-2 ml-2 text-option-6 text-xs font-medium'}>{errors.phoneNumber}</p>}
        <Button title={'REGISTER'} type={'submit'} />
      </form>
    </Card>
  )
}
