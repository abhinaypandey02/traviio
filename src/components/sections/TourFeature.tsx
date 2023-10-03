import React from 'react'
import Container from '../Container'
import { urlFor } from '@/sanity/client'
import { SanityFeature, SanityFeatureSection } from '../../sanity/types'
import Image from 'next/image'

export type FeatureSectionProps = {
    data: SanityFeatureSection
}
const TourFeature = ({ data }: FeatureSectionProps) => {
    console.log(data)
    return (

        <Container className='my-20'>
            {data.title?.en && (
                <div className='mb-10'>
                    <h2 className="text-[20px] md:text-[30px] font-[700] leading-[30px] md:leading-[34px] pt-[20px] md:pt-[16px] ">
                        {data.title?.en}
                    </h2>
                    <hr className="w-[85px] md:w-[117px] my-2  bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] mb-5" />
                </div>
            )}
            <section className={ data?.type == 'small' ?'bg-[#F2FAFF] text-center lg:w-3/4 w-full py-8':'bg-[#f4f4f4] text-center lg:w-3/4 w-full py-8'} >
                {data?.type == 'small' ? (
                    <div className="grid md:grid-cols-2 gap-7 lg:grid-cols-4 w-fit mx-auto">
                        {data?.features?.map((feature, index) => <Feature key={index} data={feature} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3  md:gap-6 w-full px-[80px] py-[10px] relative">
                        {data?.features?.map((feature, index) => <LargeFeature key={index} data={feature} />)}
                    </div>
                )}
            </section>
        </Container>

    )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data }: FeatureProps) => {
    return (
        <div className=" w-full text-center flex flex-col items-center z-[2]">
            {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={48} height={48} alt="" />}

            {/* {data.title?.en} */}

            <p className="font-[500] text-[15px]  mb-2">{data.title?.en}</p>
            <p className="mx-20 opacity-60"> {data.description?.en}</p>
        </div>
    )
}

const LargeFeature = ({ data }: FeatureProps) => {
    return (
        <div className=" w-full text-start gap-x-3 flex  items-center z-[2]">
            {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={28} height={28} alt="" />}

           <div>
            <p className="font-[500] text-[15px]  mb-2">{data.title?.en}</p>
            <p className="mx-20 opacity-60"> {data.description?.en}</p>
           </div>
        </div>
    )
}




export default TourFeature
