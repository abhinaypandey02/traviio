import React, { useState } from 'react'

import Button from '@/components/buttons/Button'

export default function Steps({
  disableNext,
  children,
  onSubmit,
}: {
  disableNext?: boolean
  children?: any[]
  onSubmit: () => void
}) {
  const [step, setStep] = useState(1)
  return (
    <div className="flex my-8 flex-col gap-10 items-center sm:w-[90%] mx-auto">
      <div className="flex gap-3 flex-col justify-center w-fit mx-auto items-center">
        <h1 className="text-blue text-base font-medium">{'Tailor your tour'}</h1>
        <div>
          <h2 className="text-black font-bold text-4xl">
            {step == 1 ? 'When will you travel?' : 'Tell us about the travelers'}
          </h2>
          <hr className="lg:w-1/3 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
        </div>
      </div>
      <div
        className={`${
          step == 1 ? 'max-w-[1280] w-[90%] bg-white' : 'max-w-[760px] w-full bg-primary'
        }  mx-auto sm:rounded-[20px] py-10 flex flex-col gap-4`}
      >
        {children && (
          <>
            {children[step - 1]}
            <div className="grid grid-cols-2 gap-12 px-24 max-w-[760px] w-full mx-auto">
              {step > 1 ? (
                <Button
                  varient="hollow"
                  text={'Back'}
                  onClick={() => {
                    setStep(step - 1)
                  }}
                  className="px-[30px] py-3 w-[246px] ml-auto"
                />
              ) : (
                <div></div>
              )}
              {step < children.length ? (
                <Button
                  varient="primary"
                  text={'Next Step'}
                  onClick={() => {
                    setStep(step + 1)
                  }}
                  disabled={disableNext}
                  className="px-[30px] py-3 w-[246px] !text-base"
                />
              ) : (
                <Button
                  varient="primary"
                  text={'Submit'}
                  onClick={onSubmit}
                  className="px-[30px] py-3 w-[246px]"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
