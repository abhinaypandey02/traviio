import React from 'react'
import ReviewSection from '@/components/organisms/ReviewSection'
import Layout from '@/components/layout'
import HappyTravelerSection from '@/components/organisms/HappyTravelerSection'
import BlogSection from '@/components/organisms/BlogSection'
import HotDeals from '@/components/organisms/HotDeals'
import FAQ from '@/components/organisms/FAQ'
import DestinationsSection from '@/components/organisms/DestinationsSection'


const demo = () => {
  
  return (
    <Layout>
      <HotDeals/>
      <HappyTravelerSection/>
      <BlogSection/>
      
      <DestinationsSection/> 
      <ReviewSection />
    </Layout>
  )
}

export default demo
