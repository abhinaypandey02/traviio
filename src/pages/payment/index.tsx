import React from 'react'

import { SanityFeatureSection } from '@/sanity/types'

import Layout from '@/components/layout'
import Footer from '@/components/layout/footer'
import FeatureSection from '@/components/sections/FeatureSection'
import Tabs from '@/components/sections/Payment/Tabs'

export default function index() {
  const features: any = {
    type: 'small',
    features: [
      {
        _type: 'feature',
        icon: {
          _type: 'icon',
          asset: {
            _ref: 'image-111ab8f560c67845718f8442c6d48685a58376ff-49x48-svg',
            _type: 'reference',
          },
        },
        _key: 'a01d9ed85a9b',
        title: {
          _type: 'localestring',
          en: 'Book with $200 deposit',
        },
      },
      {
        _type: 'feature',
        icon: {
          _type: 'icon',
          asset: {
            _ref: 'image-393fae89d6050e95f8b506e48e723bd52c388c70-96x96-png',
            _type: 'reference',
          },
        },
        _key: '78c1fc3ff814',
        title: {
          _type: 'localestring',
          en: 'Interest free payment plans',
        },
      },
      {
        _key: 'eb7c0e8cedbc',
        title: {
          _type: 'localestring',
          en: 'No fees for booking modifications',
        },
        _type: 'feature',
        icon: {
          _type: 'icon',
          asset: {
            _ref: 'image-201f1571c134329463aaeef8eadefa10bdab1994-96x96-png',
            _type: 'reference',
          },
        },
      },
      {
        _type: 'feature',
        icon: {
          _type: 'icon',
          asset: {
            _type: 'reference',
            _ref: 'image-d1aab501335dae71547bde67e1c87c39aa8e72d6-96x96-png',
          },
        },
        _key: '0954f10e731a',
        title: {
          _type: 'localestring',
          en: '24/7 Support',
        },
      },
    ],
    _type: 'feature_section',
    _key: '2d330e2f5c6c',
  }

  return (
    <Layout>
      <FeatureSection data={features} />
      <Tabs>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Tabs>
    </Layout>
  )
}
