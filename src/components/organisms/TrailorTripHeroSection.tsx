import React from 'react'

const TrailorTripHeroSection = () => {
  return (
    <div>
      <h2 className="text-blue font-medium text-center">TAILOR YOUR TRIP</h2>
      <h3 className="lg:text-3xl text-2xl mt-5 text-center font-semibold">
        Choose the ultimate place to visit
      </h3>
      <hr className="lg:w-1/12 w-1/4 m-auto my-2 rounded-full border-2 bg-yellow text-yellow" />

      <div className="hidden  my-8 sm:grid grid-flow-row gap-y-4 grid-cols-1 gap-x-5  lg:grid-cols-2">
        <div className="grid grid-flow-row grid-cols-1 gap-y-5">
          <div className="grid grid-flow-row grid-cols-2 w-full gap-x-5">
            <div className="w-fit h-fit">
              <img
                className="rounded-3xl"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/640px-Kinnaur_Kailash.jpg"
                alt=""
              />{' '}
            </div>
            <div>
              <img
                className="rounded-3xl"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/640px-Kinnaur_Kailash.jpg"
                alt=""
              />{' '}
            </div>
          </div>

          <div>
            <img
              className="rounded-3xl w-full"
              src="https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg?auto=format&w=1920&h=640&fit=crop&crop=faces,edges&q=75"
              alt=""
            />
          </div>
        </div>

        <div className="grid grid-flow-row grid-cols-1 gap-y-5">
          <div>
            <img
              className="rounded-3xl w-full"
              src="https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg?auto=format&w=1920&h=640&fit=crop&crop=faces,edges&q=75"
              alt=""
            />
          </div>
          <div className="grid grid-flow-row grid-cols-2 w-full gap-x-5">
            <div className="w-fit h-fit">
              <img
                className="rounded-3xl"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/640px-Kinnaur_Kailash.jpg"
                alt=""
              />{' '}
            </div>
            <div>
              <img
                className="rounded-3xl"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/640px-Kinnaur_Kailash.jpg"
                alt=""
              />{' '}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden  grid grid-flow-row grid-cols-2 gap-5">
        <img
          className="rounded-3xl"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/640px-Kinnaur_Kailash.jpg"
          alt=""
        />
        <img
          className="rounded-3xl"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/640px-Kinnaur_Kailash.jpg"
          alt=""
        />
        <img
          className="rounded-3xl h-32  w-full"
          src="https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg?auto=format&w=1920&h=640&fit=crop&crop=faces,edges&q=75"
          alt=""
        />
        <img
          className="rounded-3xl h-32  w-full"
          src="https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg?auto=format&w=1920&h=640&fit=crop&crop=faces,edges&q=75"
          alt=""
        />
        <img
          className="rounded-3xl"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/640px-Kinnaur_Kailash.jpg"
          alt=""
        />
        <img
          className="rounded-3xl"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/640px-Kinnaur_Kailash.jpg"
          alt=""
        />
      </div>
    </div>
  )
}

export default TrailorTripHeroSection
