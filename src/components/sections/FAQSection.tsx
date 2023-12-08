import React from 'react'
import Image from 'next/image'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { SanityFAQSection } from '@/sanity/types'

import Container from '@/components/Container'

import Schema from '@/components/atoms/Schema'

export type FAQSectionProps = {
  data: SanityFAQSection
}

const FAQSection = ({ data, locale }: PropsWithLocale<FAQSectionProps>) => {
  const [open, setOpen] = React.useState(-1)
  return (
    <Container className="bg-white flex flex-col items-center px-5 py-[52px] md:px-20 md:py-[75px] ">
      <Schema
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faqs?.map((faq) => ({
            '@type': 'Question',
            name: localizedString(faq?.question, locale),
            acceptedAnswer: {
              '@type': 'Answer',
              text: localizedString(faq?.answer, locale),
            },
          })),
        }}
      />
      <header className="flex flex-col items-center gap-3">
        <h2 className="text-blue text-[12px] md:text-[16px] font-[500] leading-[20px] md:leading-[24px] ">
          {localizedString(data.tagline, locale)}
        </h2>
        <p className="text-darkblue text-[24px] md:text-[40px] font-bold leading-[32px] md:leading-[50px] ">
          {localizedString(data?.title, locale)}
        </p>
        <hr className="w-[85px] md:w-[117px] bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] " />
      </header>
      <div className="w-full mt-[40px] md:mt-12 space-y-5 md:space-y-6">
        {data.faqs?.map((faq, index) => (
          <div className="flex flex-col gap-5" key={index}>
            <div
              className="flex gap-5 cursor-pointer"
              onClick={() => setOpen(open === index ? -1 : index)}
            >
              <Image
                src="/down_icon.svg"
                height={20}
                width={20}
                alt=""
                className={`${open === index ? '' : '-rotate-90'} transition-all`}
              />

              <strong className="font-medium text-base text-darkblue md:text-xl leading-normal md:leading-[32px]">
                {localizedString(faq?.question, locale)}
              </strong>
            </div>

            <div
              className={`${open === index ? '' : 'hidden'} ml-10 max-w-[90%] text-gray
              text-xs lg:text-base font-normal leading-normal md:leading-tight
              `}
            >
              <p>{localizedString(faq?.answer, locale)}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default FAQSection
