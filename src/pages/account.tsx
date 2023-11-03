import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { getAccessToken, getUser, useUser } from '@/contexts/UserProvider'

const Account = () => {
  const { user, logout } = useUser()
  const router = useRouter()
  if (user === null) router.push('/login')
  if (user) {
    return (
      <div>
        {user?.name}
        <button
          onClick={() => {
            logout().then(() => {
              router.push('/login')
            })
          }}
        >
          LOGOUT
        </button>
      </div>
    )
  }
  return 'Loading...'
}

export default Account
