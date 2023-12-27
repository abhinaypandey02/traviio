import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Modal } from 'react-responsive-modal'

import 'react-responsive-modal/styles.css'

const Popup = () => {
  const [open, setOpen] = useState(false)
  const [dirty, setDirty] = useState(false)
  useEffect(() => {
    const t = !dirty
      ? setTimeout(() => {
          if (!dirty) {
            setOpen(true)
            setDirty(true)
          }
        }, 10000)
      : 0
    const windowBlurListener = () => {
      if (!dirty) {
        setOpen(true)
        setDirty(true)
      }
    }
    const windowScrollListener = () => {
      const height = document.body.scrollHeight
      const scrolled = window.scrollY
      console.log(scrolled)
      if (!dirty && scrolled > height / 2) {
        setOpen(true)
        setDirty(true)
      }
    }
    if (!dirty) {
      window.addEventListener('blur', windowBlurListener)
      window.addEventListener('scroll', windowScrollListener)
    }
    return () => {
      clearInterval(t)
      window.removeEventListener('blur', windowBlurListener)
      window.removeEventListener('scroll', windowScrollListener)
    }
  }, [dirty])
  const onCloseModal = () => setOpen(false)

  const closeIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9536 1.54276C13.6304 0.849101 14.4391 0.551979 14.7587 0.879539C15.0783 1.2071 14.7884 2.03591 14.1116 2.72957L2.66794 14.4581C1.99114 15.1517 1.18245 15.4489 0.86285 15.1213C0.543246 14.7937 0.83315 13.9649 1.50996 13.2713L12.9536 1.54276Z"
        fill="#B9B7C1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.88452 2.72957C1.20771 2.03591 0.917809 1.2071 1.23741 0.879539C1.55702 0.551979 2.3657 0.849101 3.04251 1.54276L14.4861 13.2713C15.1629 13.9649 15.4528 14.7937 15.1332 15.1213C14.8136 15.4489 14.005 15.1517 13.3281 14.4581L1.88452 2.72957Z"
        fill="#B9B7C1"
      />
    </svg>
  )

  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        closeIcon={closeIcon}
        styles={{
          modalContainer: {
            padding: '15px',
          },
          modal: {
            maxWidth: '840px',
            width: '100%',
            padding: 0,
            border: 0,
            margin: 0,
            borderRadius: '16px',
          },
          closeButton: {
            right: '20px',
            top: '20px',
          },
        }}
      >
        <div className="rounded-xl   p-0 flex flex-col md:flex-row text-black  overflow-hidden overflow-x-auto">
          <div className="hidden md:w-1/2 md:flex ">
            <Image height={600} width={440} src="/popup_image.png" alt="Background" />
          </div>

          <div className="relative  min-h-[600px] md:w-1/2 justify-center items-center flex ">
            <div className="-z-10 w-full absolute h-[95%] bottom-0 ">
              <Image fill src="/popup-form-bg.svg" alt="form-background" objectFit="cover" />
            </div>
            <div className=" px-[35px] md:px-[45px] min-w-full md:min-w-[350px] ">
              <Image width={206} height={48} src="/Traviio.png" className="m-auto" alt="" />
              <p className="text-center w-full pt-3 font-medium text-base">
                Don't miss out on incredible discounted travel opportunities
              </p>

              <form action="" className="pxs-6 mt-10 ">
                <div className="my-3">
                  <label className="text-base font-medium" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 border-[1px] py-2 px-2 border-gray border-opacity-40 rounded-md"
                  />
                </div>
                <div className="mt-[18px]">
                  <label
                    className="text-base font-medium after:content-['*'] after:ml-0.5 after:text-red"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 border-[1px] py-2 px-2 border-gray border-opacity-40 rounded-md"
                  />
                </div>

                <div className="flex gap-x-2 mt-5 items-center">
                  <input
                    className="w-4 h-4 border-[1px]  rounded-[3px]  border-gray border-opacity-40 "
                    type="checkbox"
                  />
                  <p className="text-[12px] font-normal text-gray">
                    {' '}
                    By clicking 'Submit,' you agree to our Privacy Policy{' '}
                  </p>
                </div>

                <div className="flex gap-x-2 mt-2 items-center ">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-[3px] border-[1px] border-gray border-opacity-40"
                  />
                  <p className="text-[12px] font-normal text-gray">
                    I want to receive travel updates and offers{' '}
                  </p>
                </div>

                <button className="bg-blue w-full rounded-full text-white mt-5 py-2 font-semibold">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Popup
