import Input from './shared/Input.tsx'
import Button from './shared/Button.tsx'
import Card from './shared/Card.tsx'

export default function LoginForm() {
  return (
    <Card>
      <h1 className={'mb-2 ml-2 text-option-3 text-xl font-medium'}>Login</h1>
      <Input placeholder={'Email'} type={'text'} />
      <Input placeholder={'Password'} type={'password'} />
      <p className={'mt-2 my-4 ml-2 text-option-3 text-sm font-medium'}>Register</p>
      <Button title={'LOGIN'} />
    </Card>
  )
}
