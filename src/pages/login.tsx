import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { getAccessToken, useUser } from '@/contexts/UserProvider'

import Button from '@/components/buttons/Button'
import Layout from '@/components/layout/index'

import Input from '@/components/atoms/Input'

const Login = () => {
  const { user, login } = useUser()
  const { control, handleSubmit } = useForm({
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
      <main className="relative min-h-screen">
        <Image
          fill
          src={'/authBackground.png'}
          alt=""
          className="object-contain h-full w-full object-bottom bg-white -z-10"
        />
        <div className="flex flex-col gap-12 max-w-[506px] w-[90%] mx-auto pt-24 pb-64 z-10">
          <div className="flex flex-col gap-5 items-center">
            <Image src={'/company_logo.svg'} alt="traviio" height={47} width={203} />
            <p className="text-center text-darkblue text-base font-medium">Login</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-darkblue/10">
            <div className="grid grid-cols-2 h-12 text-darkblue text-base font-bold divide-x-[1px]">
              <div
                className={`flex items-center justify-center h-full border-b border-yellow bg-white`}
              >
                Login
              </div>
              <Link href={'/signup'}>
                <div
                  className={`flex items-center justify-center h-full border-b border-darkblue/10 bg-darkblue/[0.02]`}
                >
                  Sign Up
                </div>
              </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-7 flex flex-col gap-5">
              <Input
                rules={{ required: true }}
                control={control}
                type="text"
                name="email"
                label={'Email*'}
              />
              <Input
                rules={{ required: true }}
                control={control}
                type="password"
                name="password"
                label={'Password*'}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray font-medium text-sm">
                  <Input type="checkbox" control={control} name="rememberMe" />
                  <p>Remember me</p>
                </div>
                <Link
                  href={'/reset_password'}
                  className="text-gray font-medium text-sm hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button text={'Login'} className="py-3" />
            </form>
          </div>
        </div>
      </main>
    )
  return 'LOADING'
}
export default Login
