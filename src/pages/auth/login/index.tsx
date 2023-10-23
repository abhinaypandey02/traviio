import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/buttons/Button'
import Footer from '@/components/layout/footer'

import Input from '@/components/atoms/Input'

export default function Index() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [readTAndC, setReadTAndC] = useState(false)
  const footer: any = {
    link_groups: [
      {
        _type: 'link_group',
        links: [
          {
            _type: 'link',
            text: {
              en: 'Review',
              _type: 'locale_string',
            },
            _key: '76ad544ea466',
          },
          {
            _type: 'link',
            text: {
              _type: 'locale_string',
              en: 'Group Tours',
            },
            _key: '5d91d2c93144',
          },
          {
            _type: 'link',
            text: {
              _type: 'locale_string',
              en: 'Destinations',
            },
            _key: '453fd0f79e2a',
          },
        ],
        _key: 'df3424b210cd',
        title: {
          _type: 'locale_string',
          en: 'Company',
        },
      },
    ],
    description: {
      _type: 'locale_text',
      en: 'With 30 years of dedicated experience, our travel agency is here to curate your dream trip, ensuring exceptional service at every step test1.',
    },
    logo: {
      _type: 'image',
      asset: {
        _ref: 'image-bf59a345539185ad86e9ec691886707f3d2bf682-260x65-png',
        _type: 'reference',
      },
    },
    title: {
      en: 'A company by Promo Travel',
      _type: 'locale_string',
    },
  }
  const title = {
    login: 'Booking found Enter your password and you can login to your dashboard.',
    signup:
      'My Contiki is your personalised online trip hub to manage all of your travel details and documents.',
  }
  return (
    <>
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
            <p className="text-center text-darkblue text-base font-medium">{title[tab]}</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-darkblue/10">
            <div className="grid grid-cols-2 h-12 text-darkblue text-base font-bold divide-x-[1px]">
              <div
                className={`flex items-center justify-center h-full border-b ${
                  tab == 'login'
                    ? 'border-yellow bg-white'
                    : 'border-darkblue/10 bg-darkblue/[0.02]'
                }`}
                onClick={() => {
                  setTab('login')
                  setEmail('')
                  setPassword('')
                  setRememberMe(false)
                }}
              >
                Login
              </div>
              <div
                className={`flex items-center justify-center h-full border-b ${
                  tab == 'signup'
                    ? 'border-yellow bg-white'
                    : 'border-darkblue/10 bg-darkblue/[0.02]'
                }`}
                onClick={() => {
                  setTab('signup')
                  setEmail('')
                  setPassword('')
                  setRememberMe(false)
                }}
              >
                Sign Up
              </div>
            </div>
            {tab == 'login' && (
              <div className="p-7 flex flex-col gap-5">
                <Input
                  value={email}
                  setValue={setEmail}
                  type="text"
                  name="email"
                  label={'Email*'}
                />
                <Input
                  value={password}
                  setValue={setPassword}
                  type="password"
                  name="password"
                  label={'Password*'}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-gray font-medium text-sm">
                    <Input
                      type="checkbox"
                      value={rememberMe}
                      setValue={() => setRememberMe(!rememberMe)}
                      name='rememberMe'
                    />
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
              </div>
            )}
            {tab == 'signup' && (
              <div className="p-7 flex flex-col gap-5">
                <Input value={name} setValue={setName} type="text" name="name" label={'Name*'} />
                <Input
                  value={email}
                  setValue={setEmail}
                  type="text"
                  name="email"
                  label={'Email*'}
                />
                <Input
                  value={password}
                  setValue={setPassword}
                  type="password"
                  name="password"
                  label={'Password*'}
                />
                <Input
                  value={rePassword}
                  setValue={setRePassword}
                  type="password"
                  name="RePassword*"
                  label={'Re enter password**'}
                />
                <div className="flex items-center gap-1 text-gray font-medium text-sm">
                  <Input
                    type="checkbox"
                    value={readTAndC}
                    setValue={() => setReadTAndC(!readTAndC)}
                    name='readTAndC'
                  />
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
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer footer={footer} />
    </>
  )
}
