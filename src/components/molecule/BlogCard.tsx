import React from 'react'

const BlogCard = () => {
  return (
    <div className=' h-fit  w-[300px]'>
      <img 
       className=' h-[300px] w-[300px] rounded-lg'
       src="https://images.pexels.com/photos/2588193/pexels-photo-2588193.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
       <h3 className='mt-2 font-medium'>The most interesting historical monuments in Jaipur</h3>
       <h4 className='opacity-60 my-1 text-sm '>By deep on 16 August</h4>
    </div>
  )
}

export default BlogCard
