import React from 'react'
import {SanityContentSection} from  '@/sanity/types'


export type ContentSectionProps = {
    data: SanityContentSection
  }
const ContentSection = (props : ContentSectionProps) => {
    
    const {
        data: { title, tagline },
      } = props

      
  return (
    <div  className="lg:px-20 px-10 py-10  bg-white text-black">
     <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
      <h4 className="text-3xl font-medium text-center">{title?.en}</h4>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
      
     
    </div>
  )
}

export default ContentSection
