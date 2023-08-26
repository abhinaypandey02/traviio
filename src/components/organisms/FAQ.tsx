import React, { useState } from 'react'

const FAQ = () => {
    const questionans=[
        {
            question:"Can I Change my Tour?",
            ans:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            question:"Can I Change my Tour?",
            ans:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            question:"Can I Change my Tour?",
            ans:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            question:"Can I Change my Tour?",
            ans:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            question:"Can I Change my Tour?",
            ans:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
    ]
    const [select,setselected]=useState(-1)
    const setquestion=(index:any)=>{
           if(index==select){
            setselected(-1); return;
           }
           setselected(index); return;
    }
  return (
    <div>
      <h1 className='text-blue font-bold my-2 text-center w-full '>FAQ</h1>
      <h1 className='lg:text-3xl text-xl font-bold text-center'>Frequently asked  questions</h1>
      <hr className='lg:w-1/12 w-1/4 m-auto my-2 rounded-full border-2 bg-yellow text-yellow' />

      <div className='my-10'>
            {
                questionans.map((item,index)=>{
                    return(
                        <div key={index} className="my-2">
                            <h4 onClick={()=>{setquestion(index)}} className='my-2 cursor-pointer font-medium'>
                                {select==index?
                                <span   className='mr-2 '> {'>'} </span>
                                :
                                <span  className='mr-2' > {'>'} </span>
                                }
                                
                                {item.question}
                            </h4>
                            {select==index?
                            <h5 className='text-sm ml-5 opacity-40'>{item.ans}</h5>
                            :null}
                        </div>
                    )
                })
            }
      </div>
    </div>
  )
}

export default FAQ
