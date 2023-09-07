import React from 'react'
import { Line, Circle } from 'rc-progress';

const Filter = () => {
  return (
    <div className='rounded-xl shadow-xl w-full '>
        <div className=' py-3 font-medium rounded-t-2xl px-4 bg-[#ecf4ff] '>
            Filter by Rating
        </div>
        <div className='grid px-4 grid-flow-row grid-cols-1 py-6 gap-y-7'>
            <div className=' flex gap-x-2 justify-center items-center'>
                 <input type="checkbox" className='w-fit'  /> 
                 <span className='text-sm w-20  opacity-60 font-medium'>5 Star</span>
                 <Line  percent={80} strokeWidth={6} trailWidth={6} trailColor='#ecf4ff' strokeColor="#f5b536" />
                 <span className='text-sm opacity-60 font-medium'>1969</span>
            </div>
            <div className=' flex gap-x-2 justify-center items-center'>
                 <input type="checkbox" className='w-fit'  /> 
                 <span className='text-sm w-20  opacity-60 font-medium'>4 Star</span>
                 <Line  percent={40} strokeWidth={6} trailWidth={6} trailColor='#ecf4ff' strokeColor="#f5b536" />
                 <span className='text-sm opacity-60 font-medium'>102</span>
            </div>
            <div className=' flex gap-x-2 justify-center items-center'>
                 <input type="checkbox" className='w-fit'  /> 
                 <span className='text-sm w-20  opacity-60 font-medium'>3 Star</span>
                 <Line  percent={20} strokeWidth={6} trailWidth={6} trailColor='#ecf4ff' strokeColor="#f5b536" />
                 <span className='text-sm opacity-60 font-medium'>26</span>
            </div>
            <div className=' flex gap-x-2 justify-center items-center'>
                 <input type="checkbox" className='w-fit'  /> 
                 <span className='text-sm w-20  opacity-60 font-medium'>2 Star</span>
                 <Line  percent={8} strokeWidth={6} trailWidth={6} trailColor='#ecf4ff' strokeColor="#f5b536" />
                 <span className='text-sm opacity-60 font-medium'>11</span>
            </div>
            <div className=' flex gap-x-2 justify-center items-center'>
                 <input type="checkbox" className='w-fit'  /> 
                 <span className='text-sm w-20  opacity-60 font-medium'>1 Star</span>
                 <Line  percent={1} strokeWidth={6} trailWidth={6} trailColor='#ecf4ff' strokeColor="#f5b536" />
                 <span className='text-sm opacity-60 font-medium'>4</span>
            </div>
          
        </div>
    </div>
  )
}

export default Filter
