import React from 'react'
import Image from 'next/image'
import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { SanityFAQSection } from '@/sanity/types'

import Container from '@/components/Container'

export type FAQSectionProps = {
  data: SanityFAQSection
}

const FAQSection = ({ data,locale }: PropsWithLocale<FAQSectionProps>) => {
  const [open, setOpen] = React.useState(-1)
  return (
    <Container className="bg-white flex flex-col items-center py-[75px] ">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-blue text-[12px] md:text-[16px] font-[500] leading-[20px] md:leading-[24px] ">
          {localizedString(data?.tagline, locale)}
        </h1>
        <h3 className="text-darkblue text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px] ">
          {localizedString(data.title, locale)}
        </h3>
        <hr className="w-[85px] md:w-[117px] bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] " />
      </div>
      <div className="w-full mt-12 space-y-6">
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
              <p className="font-semibold text-lg">
              {localizedString(faq?.question, locale)}</p>
            </div>
            <div
              className={`${open === index ? '' : 'hidden'} ml-10 max-w-[90%] leading-6 text-gray`}
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
