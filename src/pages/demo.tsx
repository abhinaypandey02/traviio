import React from 'react'
import PriceList from '@/components/sections/PriceList'
import Layout from '@/components/layout'

const demo = () => {
  return (
    <Layout>
      <div className="my-10">
        <PriceList props={{
          tailorLink: '/tailor',
          prices: [
            {
              from: '31 May 2023',
              to: '11 Jun 2023',
              availability: 'Available',
              bookingLink: '/book',
              currentPrice: 1000,
              actualPrice: 1200,
              roomType: 'Double Bedroom'
            },
            {
              from: '31 May 2023',
              to: '11 Jun 2023',
              availability: 'Full',
              bookingLink: '/book',
              currentPrice: 1000,
              actualPrice: 1200,
              roomType: 'Double Bedroom'
            },
            {
              from: '31 May 2023',
              to: '11 Jun 2023',
              availability: 'Available',
              bookingLink: '/book',
              currentPrice: 1000,
              actualPrice: 1200,
              roomType: 'Double Bedroom'
            },
            {
              from: '31 May 2023',
              to: '11 Jun 2023',
              availability: 'Attention',
              bookingLink: '/book',
              currentPrice: 1000,
              actualPrice: 1200,
              roomType: 'Double Bedroom'
            },
            {
              from: '31 May 2023',
              to: '11 Jun 2023',
              availability: 'Almost Full',
              bookingLink: '/book',
              currentPrice: 1000,
              actualPrice: 1200,
              roomType: 'Double Bedroom'
            },
          ]
        }}/>
      </div>
    </Layout>
  )
}

export default demo
