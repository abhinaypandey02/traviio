import React from 'react'
import ReactStars from 'react-stars'
const AccomodationCard = () => {
  return (
    <div className='rounded-2xl w-[300px] shadow-lg '>
       <div className='text-center bg-[#233861] py-2 rounded-t-2xl items-center flex flex-col '>
           <h4 className='text-xl text-white font-semibold'>Basic</h4>
           <h5 className='text-white text-sm'>Comforatable accomadtion</h5>
           <ReactStars count={5} onChange={()=>{}} edit={false} value={5} size={14} color2={'#ffd700'} />
       </div>
       <div className='bg-[#ecf4ff] py-4 px-4'>
           <div>
            <img className='w-full max-h-36' src="https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=" alt="" />
            <h6 className='my-2'>Hotel RamBhaj palace</h6>
           </div>
           <div>
            <img className='w-full max-h-36' src="https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=" alt="" />
            <h6 className='my-2'>Hotel RamBhaj palace</h6>
           </div>
       </div>
    </div>
  )
}

export default AccomodationCard
