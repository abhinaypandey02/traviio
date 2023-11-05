import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal'

import Container from '@/components/Container'
import Layout from '@/components/layout'
import Popup from '@/components/sections/Popup'

import 'react-responsive-modal/styles.css'

const demo = () => {
  return (
    <Layout locale={'en'} breadcrumbs={[]}>
      <Container>
        <Popup />
      </Container>
    </Layout>
  )
}

export default demo
