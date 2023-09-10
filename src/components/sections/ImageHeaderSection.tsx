import React from 'react'
import { SanityImageHeaderSection } from '@/sanity/types'
import { urlFor } from '@/sanity/client'
import Image from 'next/image'

export type ImageHeaderSectionProps = {
    data: SanityImageHeaderSection
}
const ImageHeaderSection = (props: ImageHeaderSectionProps) => {
    console.log(props)
    const {data:{header,image,content},}=props
    return (
        <div className=''>
            <div>
                <div>
                <Image src={image?urlFor(image):''} style={{width:'100%',height:'400px'}} width={700} height={73} alt="" />
                    {/* <img className='w-full  max-h-[500px]' src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000" alt="" /> */}
                    <h2 className='text-4xl  text-white -translate-y-20  font-extrabold text-center '>{header?.en}</h2>
                </div>
                <div className='px-10 text-sm opacity-80'>
                    {/* {content?content} */}
                    {content?.en}
                </div>
            </div>
        </div>
    )
}

export default ImageHeaderSection
    