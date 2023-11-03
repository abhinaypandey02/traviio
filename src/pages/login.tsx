import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { getAccessToken, useUser } from '@/contexts/UserProvider'

import Layout from '@/components/layout/index'

const Login = () => {
  const { user, login } = useUser()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const router = useRouter()
  function onSubmit(data: { email: string; password: string }) {
    login(data.email, data.password).then(() => {
      router.push('/account')
    })
  }
  if (user) router.push('/account')
  if (user === null)
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email')} />
          <input {...register('password')} />
          <button>Submit</button>
        </form>
      </div>
    )
  return 'LOADING'
}
export default Login
