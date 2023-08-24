"use client"
import Input from '@/components/Input';
import { api } from '@/services/axios'
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useForm } from "react-hook-form";

export default function Login() {
  const { handleSubmit, register } = useForm()
  const router = useRouter()
  const handleSignIn = async (data: any) => {
    const { username, password } = data
    const response = await api.post('api/auth/login', {
      username,
      password
    })
    const { user, token } = response.data
    if (user) {
      setCookie(null, 'token', token, {
        maxAge: 60 * 60 * 9,
        path: '/'
      })
      router.push('/dashboard')
    }
  }
  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: "#94ebeb",
        borderRadius: 10,
        width: '50%',
        height: '25%'
      }}>
        <form onSubmit={handleSubmit(handleSignIn)} style={{
          display: 'flex',
        }}>
          <label htmlFor='username'>Username:</label>
          <Input type="text" placeholder='Username' id='username' {...register('username')} /><br />
          <label htmlFor='password'>Senha:</label>
          <Input type='password' placeholder='Senha' id='password' {...register('password')} /><br />
          <button type='submit' >Logar</button>
        </form >
      </div>
    </>
  )
}
