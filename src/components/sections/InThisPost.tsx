import React from 'react'



const InThisPost = () => {
    const data = [
        'Al-Muzz-Deen Allah Street',
        'Al-Muzz-Deen Allah Street',
        'Al-Muzz-Deen Allah Street',
        'Al-Muzz-Deen Allah Street',
        'Al-Muzz-Deen Allah Street',
        'Al-Muzz-Deen Allah Street',
        'Al-Muzz-Deen Allah Street',
        'Al-Muzz-Deen Allah Street',
    ]
    return (
        <div>
            <h3 className='mt-5  font-[500] text-gray'>

            Here are some of the most remarkable spots to explore in Old Cairo:
            </h3>
        <div className='px-5 mt-5 rounded-2xl  pb-5 py-1  bg-primary text-center'>

            <h2 className="text-[20px] md:text-[24px] font-[700] leading-[30px] md:leading-[34px] pt-[20px] md:pt-[16px] ">
                In this post
            </h2>
            <hr className="w-[85px] md:w-[65px] my-2 mx-auto  bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] mb-5" />

                <div className='mt-6 grid grid-flow-row  grid-cols-2 gap-y-3  m-auto'>
                {
                    data.map((item,index)=>{ 
                        return(
                            <div key={index}>
                            {index+1} {'.'+item}
                        </div>
                    )
                })
            }
                </div>
         </div>
        </div>
    )
}

export default InThisPost
