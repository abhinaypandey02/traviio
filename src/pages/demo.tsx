import React from 'react'

import Container from '@/components/Container'
import Layout from '@/components/layout'
import BlogChoose from '@/components/molecule/BlogChoose'
import PriceList from '@/components/sections/PriceList'
import BlogReview from '@/components/organisms/BlogReview'

const demo = () => {
  return (
    <Layout locale={'en'} breadcrumbs={[]}>
      <BlogReview
        image="/temp.jpg"
        name="Robert Brown"
        socialImage="/linkedin.svg"
        socialLink="/"
        text="One of the most impressive and oldest landmarks in the area of Old Cairo. It has some interesting architectural features like its offset façade facing the street front. It stands out among other neighborhood buildings as they sit at an angle unlike the mosque. The mosque also aligns with the Muslim qibla, the direction where Muslims pray facing Mecca."
      />
    </Layout>
  )
}

export default demo
