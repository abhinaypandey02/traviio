import React from 'react'
import IncludedTour from '@/components/sections/IncludedTour'
import Layout from '@/components/layout'

const demo = () => {
  return (
    <Layout>
      <div className='my-10'>
        <IncludedTour
          items={[
            {
              icon: '/email_icon.svg',
              title: 'Email',
              description:
                '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            },
            {
              icon: '/email_icon.svg',
              title: 'Email',
              description:
                '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            },
            {
              icon: '/email_icon.svg',
              title: 'Email',
              description:
                '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            },
            {
              icon: '/fb_logo.svg',
              title: 'What\'s included',
              bullets:[
                "Helloword",
                "Hello",
                "adsfasdfsf",
                "ASDFdsaf"
              ]
            },
          ]}
        />
      </div>
    </Layout>
  )
}

export default demo
