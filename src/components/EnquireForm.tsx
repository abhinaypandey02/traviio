import React from 'react'

const EnquireForm = () => {
    return (
        <div className='rounded-2xl w-[300px]'>
            <div className='flex justify-between rounded-t-2xl  py-2 px-4 bg-[#152a4a] text-white'>
                <div >
                    <h3 className='text-2xl font-semibold'>Enquire</h3>
                    <hr className='w-1/2 my-1 text-yellow bg-yellow h1 border-[1px]' />
                    <h6>+9024446964</h6>
                </div>
            </div>
            <div>
                <img src="" alt="" />
            </div>
            <div className='bg-[#e7f5fd] px-4 py-4 rounded-b-2xl'>

                <form>

                    <div className='my-3'>
                        <label className='text-lg my-1' htmlFor="name">Name*</label>
                        <input type="text" className='w-full my-1 rounded-md h-10' />
                    </div>

                    <div className=' my-3'>
                        <label className='text-lg my-1' htmlFor="email">Email*</label>
                        <input type="email" className='w-full my-1 rounded-md h-10' />
                    </div>


                    <div className='my-3'>
                        <label className='text-lg   my-1' htmlFor="nationality">Nationality*</label>
                        <select name=""  className='block w-full bg-white h-10 my-1 rounded-md' id="">
                            <option value=""></option>
                        </select>
                    </div>

                    <div className=' my-3'>
                        <label className='text-lg my-1' htmlFor="mobile">Mobile</label>
                        <input type="email" className='w-full my-1 rounded-md h-10' />
                    </div>



                    <div className=' my-3'>
                        <label className='text-lg my-1' htmlFor="details">More Deatils</label>
                        <textarea rows={12}  className='w-full my-1 rounded-md h-10' />
                    </div>







                </form>
            </div>
        </div>
    )
}

export default EnquireForm
