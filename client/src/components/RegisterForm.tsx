import Input from './shared/Input.tsx'
import Button from './shared/Button.tsx'
import Card from './shared/Card.tsx'

export default function RegisterForm() {
  return (
    <Card>
      <h1 className={'mb-2 ml-2 text-option-3 text-xl font-medium'}>Register</h1>
      <Input placeholder={'Name'} type={'text'} />
      <Input placeholder={'Email'} type={'email'} />
      <Input placeholder={'Password'} type={'password'} />
      <Input placeholder={'Confirm Password'} type={'password'} />
      <Input placeholder={'Phone'} type={'password'} />
      <Button title={'REGISTER'} />
    </Card>
  )
}
