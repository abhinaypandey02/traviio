import React, { useState } from 'react';
import Container from '@/components/Container'
import Layout from '@/components/layout'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Popup from '@/components/sections/Popup';

const demo = () => {


  return (
    <Layout locale={'en'} breadcrumbs={[]}>
      <Container>

       <Popup/>
         

      </Container>
    </Layout>
  )
}

export default demo
