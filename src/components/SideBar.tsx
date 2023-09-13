import React from 'react'

const SideBar = () => {
  return (
    <div className="bg-[#F2FAFF] w-[350px] px-3 py-10 rounded-md">
      <h4 className="font-medium text-xl">Search articles</h4>
      <hr className="text-yellow h-1 rounded-full my-1  bg-yellow w-1/4 border-1" />
      <input type="text" placeholder="Search" className="w-full my-2 rounded-2xl px-3 py-2" />
      <hr className="my-5 opacity-40 text-gray" />
      <h4 className="font-medium text-xl">Latest articles</h4>
      <hr className="text-yellow h-1 rounded-full my-1  bg-yellow w-1/4 border-1" />
    </div>
  )
}

export default SideBar
