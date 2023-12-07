import { useEffect, useState } from 'react'
import Image from 'next/image'
import { City, Country, State } from 'country-state-city'
import { set } from 'mongoose'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import {
  SanityItineraryDetailsListItem,
  SanityItinerarySection,
  SanityLocaleString,
} from '@/sanity/types'
import { CaretDown, Dot, Minus, Plus } from '@phosphor-icons/react'

import Button from '@/components/buttons/Button'
import Container from '@/components/Container'

export default function ItinerarySection({
  data,
  locale,
}: PropsWithLocale<{ data: SanityItinerarySection }>) {
  // console.log('ItinerarySection-> ', data)
  // console.log(Country.getAllCountries())
  return (
    <Container className=" mt-20   md:px-20 px-5 flex flex-col py-20 gap-10">
      <div id="itinerary" className="flex gap-2 flex-col justify-center w-fit mx-auto items-center">
        <h2 className="text-blue text-base font-medium capitalize">
          {localizedString(data?.tagline, locale)}
        </h2>
        <div>
          <h3 className="text-black font-bold text-[24px] lg:text-[40px] tracking-tight">
            {localizedString(data?.title, locale)}
          </h3>
          <hr className="lg:w-1/3 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
        </div>
      </div>
      <div className="flex gap-7">
        {/* Travel Schedule */}
        <TravelSchedule data={data?.itinerary_day_cards} />
        {/* Enquire Tab */}

        <EnquireTab />
      </div>
    </Container>
  )
}

const TravelSchedule = ({
  data,
}: {
  data?: SanityItineraryDetailsListItem['itinerary_details_lists']
}) => {
  const [openStatus, setOpenStatus] = useState<boolean[]>(
    Object.assign({}, Array(data?.length ?? 0).fill(false))
  )
  useEffect(() => {
    setOpenStatus({ ...openStatus, '0': true })
  }, [])
  return (
    <div className="w-full flex flex-1 flex-col gap-5">
      <div className="flex justify-end w-full">
        <button
          className="text-blue text-[16px] flex gap-2 font-bold lg:mr-8"
          onClick={() => {
            setOpenStatus(Object.assign({}, Array(data?.length ?? 0).fill(true)))
          }}
        >
          Expand All <div className="hidden lg:block">{<CaretDown />}</div>
        </button>
      </div>
      <div className="flex  flex-col gap-5">
        {data?.map((day, index) => (
          <Expandable
            isOpen={openStatus[index]}
            toggleOpen={() => {
              setOpenStatus({ ...openStatus, [index]: !openStatus[index] })
            }}
            key={index}
            {...day}
            data={day}
          />
        ))}
      </div>
    </div>
  )
}

const EnquireTab = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nationality: '',
    phone: '+1',
    from: '',
    to: '',
    members: '1',
    details: '',
  })
  const [mobileNumber, setMobileNumber] = useState({
    mobileCode: '+1',
    mobileNumber: '',
  })
  const setValue = (value: string, key: string) => {
    setFormData({ ...formData, [key]: value })
  }
  return (
    <div className="w-[282px]  max-lg:hidden h-fit rounded-2xl border text-white overflow-hidden bg-primary mt-12">
      <div className="py-2 px-5 bg-secondaryDarkBlue">
        <div className="flex justify-between">
          <div className="">
            <p className="font-bold text-xl">Enquire</p>
            <hr className="lg:w-1/2 w-1/3 my-2 text-yellow bg-yellow  rounded-full border-2" />
          </div>
          <div className="relative w-7 h-7">
            <Image src={'/contact_mail_icon.svg'} alt="" fill />
          </div>
        </div>
        <div className="flex gap-1">
          <Image src="/whatsapp_logo.svg" height={12} width={12} alt="Whatsapp logo" />
          <p className="font-bold text-[10px]">+1 0000 000 000</p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-5">
        <div className="flex  font-medium text-base text-black flex-col gap-2">
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            type="text"
            className="border border-darkblue/10 text-black rounded p-1"
            value={formData['name']}
            onChange={(e) => {
              setValue(e.target.value, 'name')
            }}
          />
        </div>
        <div className="flex  font-medium text-base text-black flex-col gap-2">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="text"
            className="border border-darkblue/10 text-black rounded p-1"
            value={formData['email']}
            onChange={(e) => {
              setValue(e.target.value, 'email')
            }}
          />
        </div>
        <div className="flex font-medium text-base text-black flex-col gap-2">
          <label htmlFor="nationality">Nationality*</label>
          <select
            id="nationality"
            className="border bg-white border-darkblue/10 text-black rounded p-1 py-2"
            value={formData['nationality']}
            placeholder="Select"
            onChange={(e) => {
              setValue(e.target.value, 'nationality')
            }}
          >
            <option value="" disabled>
              Select Nationality
            </option>
            {Country.getAllCountries().map((item: any, index: any) => {
              return <option value={item.name}>{item.name}</option>
            })}
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
          </select>
        </div>
        <div className="flex  font-medium text-base text-black flex-col gap-2">
          <label htmlFor="mobileNumber">Mobile</label>
          <div className="border bg-white text-base border-darkblue/10 text-black rounded p-1 grid grid-cols-[1fr_7fr] gap-1 divide-x-2 divide-darkblue/10 py-2">
            <input
              className="min-w-0 w-full flex items-center justify-center h-full overflow-hidden focus:outline-none"
              id="mobileCode"
              value={mobileNumber['mobileCode']}
              onChange={(e) => {
                setMobileNumber({ ...mobileNumber, mobileCode: e.target.value || '+' })
                setValue(mobileNumber['mobileCode'] + mobileNumber['mobileNumber'], 'phone')
                // console.log(mobileNumber)
              }}
            />
            <input
              className="h-full min-w-0 w-full overflow-hidden focus:outline-none px-2"
              id="mobileNumber"
              value={mobileNumber['mobileNumber']}
              placeholder="Mobile Number"
              onChange={(e) => {
                setMobileNumber({ ...mobileNumber, mobileNumber: e.target.value })
                setValue(mobileNumber['mobileCode'] + mobileNumber['mobileNumber'], 'phone')
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 ">
          <div className="flex min-w-0 w-full font-medium text-base text-black flex-col gap-2">
            <label htmlFor="from">From</label>
            <input
              id="from"
              type="date"
              className="border border-darkblue/10 text-black rounded p-1"
              value={formData['from']}
              onChange={(e) => {
                setValue(e.target.value, 'from')
              }}
            />
          </div>
          <div className="flex min-w-0 w-full font-medium text-base text-black flex-col gap-2">
            <label htmlFor="to">To</label>
            <input
              id="to"
              type="date"
              className="border border-darkblue/10 text-black rounded p-1"
              value={formData['to']}
              onChange={(e) => {
                setValue(e.target.value, 'to')
              }}
            />
          </div>
        </div>
        <div className="flex font-medium text-base text-black flex-col gap-2">
          <p>Member's</p>
          <div className="border border-darkblue/10 flex gap-2 bg-white p-2 justify-between">
            <div className="font-normal text-sm">Adults (+ 12 year)</div>
            <div className="flex">
              <div
                className="w-[22px] h-[22px] bg-yellow flex items-center justify-center"
                onClick={() => {
                  setValue(Math.max(parseInt(formData['members']) - 1, 1).toString(), 'members')
                }}
              >
                {<Minus color="white" />}
              </div>
              <div className="w-[22px] h-[22px] bg-darkblue/10 text-black flex items-center justify-center select-none">
                {formData.members}
              </div>
              <div
                className="w-[22px] h-[22px] bg-yellow flex items-center justify-center"
                onClick={() => {
                  setValue(Math.min(parseInt(formData['members']) + 1, 30).toString(), 'members')
                }}
              >
                {<Plus color="white" />}
              </div>
            </div>
          </div>
        </div>
        <div className="flex  font-medium text-base text-black flex-col gap-2">
          <label htmlFor="details">More Details</label>
          <textarea
            id="details"
            rows={3}
            className="border border-darkblue/10 text-black rounded p-1"
            value={formData['details']}
            onChange={(e) => {
              setValue(e.target.value, 'details')
            }}
          />
        </div>
        <Button
          onClick={() => {
            fetch('/api/email', {
              method: 'POST',
              body: JSON.stringify({
                subject: 'New Enquiry Request',
                text: `You received a new "Enquiry" request by ${formData?.name}! Following are the details:
                 
                    Duration: From - ${formData.from}, To - ${formData.to}
                    Email: ${formData?.email}  
                    Nationality: ${formData?.nationality}  
                    Adults: ${formData?.members}  
                    Phone: ${formData?.phone}  
                    More info : ${formData?.details}
                  `,
              }),
            }).then(() => {
              alert(`Request successfully submitted. You shall hear from us soon!`)
            })
          }}
          text={'Submit'}
          varient="secondary"
        />
      </div>
    </div>
  )
}

const Expandable = ({
  data,
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean
  toggleOpen: any
  data: SanityItineraryDetailsListItem
}) => {
  return (
    <div>
      <div
        className={`flex flex-nowrap transition-all justify-between ${
          isOpen ? 'bg-blue text-white' : 'bg-darkblue/[0.02] text-black'
        }  items-center px-7 py-4 ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}
        onClick={() => {
          toggleOpen()
        }}
      >
        <p className="w-5 font-bold lg:text-xl flex-1">{data.title?.en}</p>
        <CaretDown width={'24px'} height={'24px'} className={`${isOpen && 'rotate-180'}`} />
      </div>
      <div
        className={`flex flex-col gap-6 transition-all  rounded-b-2xl ${
          !isOpen ? 'overflow-hidden h-0' : 'p-5'
        }`}
      >
        <div className="flex lg:flex-row flex-col gap-6">
          <div className="relative w-full h-[200px] overflow-hidden sm:w-[168px] sm:h-[112px] md:w-[252px] md:h-[168px] rounded-2xl ">
            <Image
              alt=""
              src={data.image ? urlFor(data.image || '') : ''}
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <p className="flex-1">{data.description?.en}</p>
        </div>
        <div className="flex flex-col gap-6">
          {data.itinerary_details_lists?.map((list, index) => (
            <ExpandableList
              key={index}
              title={list.title?.en ?? ''}
              icon={list.icon ? urlFor(list.icon) : ''}
              itinerary_details_list_items={list?.itinerary_details_list_items}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
const ExpandableList = ({
  title,
  icon,
  itinerary_details_list_items,
}: {
  title: string
  icon: string
  itinerary_details_list_items: (SanityLocaleString | undefined)[] | undefined
}) => {
  return (
    <div className="">
      <div className="flex gap-2">
        <div className="relative w-7 h-7">
          <Image alt="" src={icon} fill className="object-center" />
        </div>
        <div className="flex flex-col">
          <p className="flex-1 text-xl font-medium tracking-tight">{title}</p>
          <hr className="w-20 my-2 text-yellow  bg-yellow  rounded-full border-2" />
        </div>
      </div>
      <div className="flex flex-col pl-7 gap-2">
        {itinerary_details_list_items?.map((item, index: number) => {
          return (
            <div key={index} className="flex flex-nowrap items-center text-base font-normal">
              {<Dot size={'30'} />} {item?.en}
            </div>
          )
        })}
      </div>
    </div>
  )
}
