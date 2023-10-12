import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'

const ArticleHeroSection = ({data}:any) => {

  return (

      
    <div className=' my-10'>

       <h1 className='text-4xl font-semibold'>8 Best Things to Do in Cairo in 2023</h1>
       <h2 className='my-5 font-semibold'>By {data?.author?.en} On  <span className='text-yellow'>{data?.time?.en}</span> </h2>
  
       <Image
          src={data.cover_image ? urlFor(data.cover_image) : ''}
          style={{ width: '100%', height: '420px', objectFit: 'cover' }}
          width={700}
          height={73}
          alt=""
          />
       <p className='my-5 opacity-70 text-md'> 
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi fugiat ea voluptatem, rerum iste animi dolorem nemo delectus perferendis tempore similique ex, debitis natus doloribus nam sunt fugit tenetur dolore corporis blanditiis ducimus odio maxime. Neque error ipsum ut sapiente vel quod quaerat quas non animi, in libero ratione veritatis? Error cupiditate ex nesciunt sit neque sapiente reiciendis, distinctio hic corrupti rerum id maxime nam molestias, dignissimos similique esse explicabo nihil eaque quo. Optio omnis est error expedita reiciendis excepturi saepe labore quasi eius, suscipit voluptatum ducimus, molestiae adipisci voluptate et. Soluta facilis magni nemo quia odio? Ea, modi? Labore?
       </p>
    </div>
   
  )
}

export default ArticleHeroSection
