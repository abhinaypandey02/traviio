import React from 'react'

import Layout from '@/components/layout'

import BlogDetailCard from '@/components/molecule/BlogDetailCard'
import Container from '@/components/molecule/Container'
import BlogSidebar from '@/components/organisms/BlogSidebar'

const demo = () => {
  return (
    <Layout>
      <Container className="grid grid-cols-3 my-10">
        <BlogDetailCard
          country="India"
          title="The most interesting historical monuments in Jaipur"
          date="2021-08-16"
          image="https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60"
          link="/"
          excerpt='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?'
          author="Deep"
          />
          <div></div>
          <BlogSidebar />
      </Container>
    </Layout>
  )
}

export default demo
