import React from 'react'

import { SanityFAQSection } from '@/sanity/types'

export type FAQSectionProps = {
  data: SanityFAQSection
}

const FAQSection = ({ data }: FAQSectionProps) => {
  return (
    <div className="bg-white flex flex-col my-[48px] items-center p-2 ">
      <h1 className="text-blue text-[12px] md:text-[16px] font-[500] leading-[20px] md:leading-[24px] ">
        {data.title?.en}
      </h1>
      <h3 className="text-darkblue text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px] ">
        {data.tagline?.en}
      </h3>
      <hr className="w-[85px] md:w-[117px] my-2 bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] " />

      <div className="w-full mt-8 space-y-4">
        {data.faqs?.map((faq, index) => (
          <details key={index} className="text-black m-4 md:mx-[80px] ">
            <summary className="cursor-pointer text-[16px] md:text-[20px] font-[500] leading-[24px] md:leading-[32px] text-darkblue ">
              {faq.question?.en}
            </summary>
            <div className="mt-2 ml-5 text-[12px] md:text-[16px] font-[400] leading-[20px] md:leading-[24px] text-gray">
              {faq.answer?.en}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

export default FAQSection
