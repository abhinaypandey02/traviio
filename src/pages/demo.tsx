import React from 'react'
import ContactCTA from '@/components/sections/ContactCTA'
import PopularTours from '@/components/sections/PopularTours'
import PopularAttractions from '@/components/sections/PopularAttractions'
import Layout from '@/components/layout'

const demo = () => {
  
  return (
    <Layout>
      <ContactCTA />
      <PopularTours />
      <hr className='mx-auto w-[90%] my-10 border-none bg-primary h-[3px] '/>
      <PopularAttractions />
    </Layout>
  )
}

export default demo
