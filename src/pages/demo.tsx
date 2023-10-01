import React from 'react'

import Container from '@/components/Container'
import Layout from '@/components/layout'

import BlogChoose from '@/components/molecule/BlogChoose'

const demo = () => {
  return (
    <Layout>
      <Container className="">
        <BlogChoose
          items={[
            {
              images: ['/calendar.svg'],
              title: 'Palestine',
              link: '/blogs/palestine',
            },

            {
              images: ['/calendar.svg'],
              title: 'Calendar2',
              link: '/',
            },
            {
              images: ['/calendar.svg', '/calendar.svg'],
              title: 'Calendar',
              link: '/demo',
            },
          ]}
        ></BlogChoose>
      </Container>
    </Layout>
  )
}

export default demo
