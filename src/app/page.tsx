"use client"
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
      <form onSubmit={handleSubmit(handleSignIn)}>
        <label htmlFor='username'>Username:</label>
        <input type="text" placeholder='Username' id='username' {...register('username')}></input><br />
        <label htmlFor='password'>Senha</label>
        <input type='password' placeholder='Senha' id='password' {...register('password')} ></input><br />
        <button type='submit' >Logar</button>
      </form >
    </>
  )
}
