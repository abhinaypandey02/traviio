import React, { useState } from 'react'

import Layout from '@/components/layout'
import FAQSection from '@/components/sections/FAQSection'
import Step1 from '@/components/sections/Tailor Your Tour/Step1'
import Step2, { TailorTripFormData } from '@/components/sections/Tailor Your Tour/Step2'
import Steps from '@/components/sections/Tailor Your Tour/Steps'

export default function TailorYourTour() {
  const FAQData: any = {
    faqs: [
      {
        question: {
          _type: 'locale_string',
          en: 'Can I change or cancel my Tour?',
        },
        _type: 'faq',
        _key: 'f2a8c0373d13',
        answer: {
          _type: 'locale_string',
          en: 'All orders are final once they have been processed through the checkout. Unfortunately, no further changes can be made to your order once processed including and not limited to; removing and/or adding items to your order, combining orders or cancelling your order.Please ensure all details on your order are correct before confirming your checkout. In particular, we recommend double-checking your email address, delivery address and the acceptance, and accuracy, of promotional codes.',
        },
      },
      {
        _key: 'e01df0a30c7d',
        answer: {
          _type: 'locale_string',
          en: 'Nothing',
        },
        question: {
          _type: 'locale_string',
          en: 'What if I received my tour and is faulty or incorrect?',
        },
        _type: 'faq',
      },
      {
        _type: 'faq',
        _key: '65facaa04f63',
        answer: {
          _type: 'locale_string',
          en: 'Hello',
        },
        question: {
          _type: 'locale_string',
          en: 'Do you offer exchanges?',
        },
      },
      {
        question: {
          _type: 'locale_string',
          en: 'Do you offer international tour?',
        },
        _type: 'faq',
        _key: '9c1b457bb047',
        answer: {
          _type: 'locale_string',
          en: 'Hello twice',
        },
      },
      {
        answer: {
          _type: 'locale_string',
          en: 'Jack',
        },
        question: {
          _type: 'locale_string',
          en: "What should I do if I don't my tour on time?",
        },
        _type: 'faq',
        _key: 'f852a1ce4ed6',
      },
    ],
    _type: 'faq_section',
    tagline: {
      _type: 'locale_string',
      en: 'Frequently asked questions',
    },
    _key: 'fdeae1882551',
    title: {
      _type: 'locale_string',
      en: 'FAQ',
    },
  }
  const [duration, setDuration] = useState<string>()
  const [formData, setFormData] = useState<TailorTripFormData>()
  return (
    <Layout>
      <Steps
        onSubmit={() => {
          alert(
            `Submitting ${duration} ${
              formData &&
              Object.keys(formData).map(
                (key) => `${key}: ${formData[key as keyof typeof formData]}`
              )
            }`
          )
        }}
      >
        <Step1 onChange={setDuration} />
        <Step2 onChange={setFormData} />
      </Steps>
      <FAQSection data={FAQData} />
    </Layout>
  )
}
