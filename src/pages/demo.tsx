import React from 'react'

import Container from '@/components/Container'
import Layout from '@/components/layout'
import BlogChoose from '@/components/molecule/BlogChoose'
import PriceList from '@/components/sections/PriceList'

const demo = () => {
  return (
    <Layout locale={'en'} breadcrumbs={[]}>
      <Container className="">
        <PriceList
          props={{
            tailorLink: '/tailor',
            prices: [
              {
                from: '31 May 2023',
                to: '11 Jun 2023',
                availability: 'Available',
                bookingLink: '/book',
                currentPrice: '2,543',
                actualPrice: '2,625',
                roomType: 'Double Bedroom',
              },
              {
                from: '31 May 2023',
                to: '11 Jun 2023',
                availability: 'Full',
                bookingLink: '/book',
                currentPrice: 1000,
                actualPrice: 1200,
                roomType: 'Double Bedroom',
              },
              {
                from: '31 May 2023',
                to: '11 Jun 2023',
                availability: 'Available',
                bookingLink: '/book',
                currentPrice: 1000,
                actualPrice: 1200,
                roomType: 'Double Bedroom',
              },
              {
                from: '31 May 2023',
                to: '11 Jun 2023',
                availability: 'Attention',
                bookingLink: '/book',
                currentPrice: 1000,
                actualPrice: 1200,
                roomType: 'Double Bedroom',
              },
              {
                from: '31 May 2023',
                to: '11 Jun 2023',
                availability: 'Almost Full',
                bookingLink: '/book',
                currentPrice: 1000,
                actualPrice: 1200,
                roomType: 'Double Bedroom',
              },
            ],
          }}
        />
      </Container>
    </Layout>
  )
}

export default demo
