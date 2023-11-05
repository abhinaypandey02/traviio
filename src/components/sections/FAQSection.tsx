import React from 'react'
import Image from 'next/image'

import { SanityFAQSection } from '@/sanity/types'

import Container from '@/components/Container'

export type FAQSectionProps = {
  data: SanityFAQSection
}

const FAQSection = ({ data }: FAQSectionProps) => {
  const [open, setOpen] = React.useState(-1)
  return (
    <Container className="bg-white flex flex-col items-center py-[52px] md:py-[75px] ">
      <div className="flex flex-col items-center gap-3">
        {/* <div class="text-center text-sky-400 text-xs font-medium font-['Satoshi Variable'] uppercase leading-tight">FAQ</div> */}
        <h1 className="text-blue  text-[12px] md:text-[16px] font-[500]  leading-[20px] md:leading-[24px] uppercase">
          {data.title?.en}
        </h1>
        {/* <div class="text-slate-900 text-2xl font-bold font-['Satoshi Variable'] leading-loose">Frequently asked questions</div> */}
        <h3 className="text-darkblue text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px] ">
          {data?.tagline?.en}
        </h3>
        <hr className="w-[85px] md:w-[117px] bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] " />
      </div>
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

              <p className="font-medium text-base md:text-xl leading-normal md:leading-loose">
                {faq?.question?.en}
              </p>
            </div>

            <div
              className={`${open === index ? '' : 'hidden'} ml-10 max-w-[90%] text-gray
              text-xs md:text-base font-normal leading-normal md:leading-tight
              `}
            >
              <p>{faq?.answer?.en}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default FAQSection
