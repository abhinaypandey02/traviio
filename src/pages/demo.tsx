import React from 'react'

import Container from '@/components/Container'
import Layout from '@/components/layout'
import BlogChoose from '@/components/molecule/BlogChoose'
import PriceList from '@/components/sections/PriceList'
import BlogReview from '@/components/organisms/BlogReview'
import InThisPost from '@/components/sections/InThisPost'
import ArticleHeroSection from '@/components/sections/ArticleHeroSection'

const demo = () => {
  return (
    <Layout locale={'en'} breadcrumbs={[]}>
      <Container>
     
     

      <InThisPost/>
      </Container>
    </Layout>
  )
}

export default demo
