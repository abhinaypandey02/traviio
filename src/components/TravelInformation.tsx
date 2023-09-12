import React from 'react'

const TravelInformation = () => {
  return (
    <div className="w-full text-center flex flex-col items-center justify-center  rounded-2xl border-yellow border-[1px] shadow-md px-20 py-10">
      <img
        src="https://cdn.sanity.io/images/89zc28rs/production/d8169b4b4dd1efff87d7d456b6dc5cedfdb5ee19-49x48.svg"
        alt=""
      />
      <h2 className="my-3 text-4xl font-medium">Essential Travel inforamtion</h2>
      <h5 className="text-base my-4 opacity-60">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eveniet doloribus dolore ea
        velit exercitationem ducimus qui earum tenetur autem aspernatur placeat, vel harum
        laudantium accusamus! Ea possimus iste quibusdam.
      </h5>
      <button className="bg-blue px-10 py-3 text-white text-sm font-semibold rounded-3xl">
        Read More
      </button>
    </div>
  )
}

export default TravelInformation
