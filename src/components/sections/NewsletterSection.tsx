import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityNewsletterSection } from '@/sanity/types'

export type NewsletterSectionProps = {
  data: SanityNewsletterSection
}

const NewsletterSection = ({ data }: NewsletterSectionProps) => {
  return (
    <div className="flex justify-center items-center py-10 bg-white text-white">
      <div
        className=" md:w-[1280px] h-[300px] md:h-[444px]  md:rounded-[24px] md:mx-10 "
        style={{
          backgroundImage: `url(${urlFor(data.image)})`,
        }}
      >
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start p-8 gap-4 md:gap-8 md:w-[700px] h-[300px] md:h-[344px] ">
          <h1 className="text-center md:text-start text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px] ">
            {data.title.en}
          </h1>
          <h3 className="text-center md:text-start text-[14px] md:text-[20px] font-[500] md:font-[400] leading-[20px] md:leading-[32px]">
            {data.subtitle.en}
          </h3>
          <div className="relative flex items-center">
            <input
              className="w-[250px] md:w-[420px] h-[40px] md:h-[48px] rounded-[60px] px-3 md:px-5 text-[12px] md:text-[16px] font-[400] leading-[22px] md:leading-[24px] "
              type="text"
              placeholder={data.email_form.placeholder.en}
            />
            <button className="flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-[30px] bg-blue-500 text-white bg-yellow w-[78px] md:w-[95px] h-[30px] md:h-[38px] text-[12px] md:text-[16px] font-[500] md:font-[700] leading-[17px] md:leading-[24px] ">
              {data.email_form.submit_button.label.en}
            </button>
          </div>

          <div className="flex md:flex-col items-center md:items-start gap-2">
            <p className="text-[12px] md:text-[20px] font-[700] leading-[20px] md:leading-[32px] ">
              {data.query_section_title.en}
            </p>
            <div className="flex items-center gap-1">
              <Image src={urlFor(data.query_section_subtitle_icon)} width={24} height={24} alt="" />
              <p className="text-[10px] md:text-[16px] font-[700] md:font-[500] leading-[14px] md:leading-[24px] ">
                {data.query_section_subtitle.en}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsletterSection
