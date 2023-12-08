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

const Login = ({ email }: { email?: string }) => {
  const { user, signup } = useUser()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: email || '',
      password: '',
      name: '',
    },
  })
  const router = useRouter()
  function onSubmit(data: { email: string; password: string; name: string }) {
    signup(data.email, data.password, data.name).then(() => {
      router.push('/account')
    })
  }
  if (user) router.push('/account')
  if (user === null)
    return (
      <main className="relative">
        <Image
          fill
          src={'/authBackground.png'}
          alt=""
          className="object-contain object-bottom bg-white -z-10"
        />
        <div className="flex flex-col gap-12 max-w-[506px] w-[90%] mx-auto pt-24 pb-64 z-10">
          <div className="flex flex-col gap-5 items-center">
            <Image src={'/company_logo.svg'} alt="traviio" height={47} width={203} />
            <p className="text-center text-darkblue text-base font-medium">Signup</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-darkblue/10">
            <div className="grid grid-cols-2 h-12 text-darkblue text-base font-bold divide-x-[1px]">
              <Link href={'/login'}>
                <div
                  className={`flex items-center justify-center h-full border-b border-darkblue/10 bg-darkblue/[0.02]`}
                >
                  Login
                </div>
              </Link>
              <div
                className={`flex items-center justify-center h-full border-b border-yellow bg-white`}
              >
                Sign Up
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-7 flex flex-col gap-5">
              <Input
                rules={{ required: true }}
                control={control}
                type="text"
                name="name"
                label={'Name*'}
              />
              <Input
                disabled={!!email}
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
              <Input
                control={control}
                type="password"
                name="re_password"
                label={'Re enter password**'}
              />
              <div className="flex items-center gap-1 text-gray font-medium text-sm">
                <Input type="checkbox" control={control} name="readTAndC" />
                <p>
                  I agree to the{' '}
                  <Link href={'#'} className="text-blue underline">
                    terms and conditions
                  </Link>{' '}
                  and{' '}
                  <Link href={'#'} className="text-blue underline">
                    privacy policy
                  </Link>
                </p>
              </div>

              <Button text={'Sign Up'} className="py-3" />
            </form>
          </div>
        </div>
      </main>
    )
  return 'LOADING'
}
export default Login
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { email: query['email'] || null } }
}
