import React, { useEffect } from 'react'
import Calendar from 'react-calendar'

import OptionSelectButton from '@/components/atoms/OptionSelectButton'

import 'react-calendar/dist/Calendar.css'
export default function Step1({ onChange }: { onChange: (date: string) => void }) {
  const [mode, setMode] = React.useState('exactDates')
  const [duration, setDuration] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [date, setDate] = React.useState<Date[]>()

  useEffect(() => {
    if (date) onChange(`From - ${date[0]?.toDateString()} To - ${date[1]?.toDateString()}`)
    else if (!month || !duration) onChange('')
    else onChange(`Month - ${month}, Duration - ${duration}`)
  }, [duration, month, date])
  const Durations = [
    { name: 'Less than 1 Week', gridSpan: 'col-span-2' },
    { name: '1 Week', gridSpan: 'col-span-1' },
    { name: '2 Week', gridSpan: 'col-span-1' },
    { name: '3 Week', gridSpan: 'col-span-1' },
    { name: '4 Week', gridSpan: 'col-span-1' },
    { name: 'More than 1 Months', gridSpan: 'col-span-2' },
  ]
  const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return (
    <div className={`flex flex-col gap-14 px-9 sm:px-14`}>
      <div className="flex max-lg:flex-col gap-4 px-10 lg:gap-12">
        <div
          className="text-lg font-medium text-darkblue flex gap-[6px] items-center flex-nowrap whitespace-nowrap w-fit"
          onClick={() => {
            setMode('exactDates')
          }}
        >
          <OptionSelectButton value={mode == 'exactDates'} /> I know the exact dates of my trip
        </div>
        <div
          className="text-lg font-medium text-darkblue flex gap-[6px] items-center flex-nowrap whitespace-nowrap w-fit"
          onClick={() => {
            setMode('approxDates')
          }}
        >
          <OptionSelectButton value={mode == 'approxDates'} /> I have approximate dates.
        </div>
      </div>
      {mode == 'exactDates' && (
        <div className={'flex justify-center'}>
          <Calendar onChange={(value: any) => setDate(value)} selectRange={true} />
        </div>
      )}
      {mode == 'approxDates' && (
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="flex flex-col w-[300px] gap-3 text-base text-gray ">
            <p>(1) Select Month</p>
            <div className="p-4 grid grid-cols-3 gap-x-1 bg-white rounded shadow-md">
              {Months.map((item: any, index) => (
                <>
                  {index != 0 && index % 3 == 0 && (
                    <>
                      <hr className="w-[48px] my-[18px] mx-auto text-darkblue/10" />
                      <hr className="w-[48px] my-[18px] mx-auto text-darkblue/10" />
                      <hr className="w-[48px] my-[18px] mx-auto text-darkblue/10" />
                    </>
                  )}
                  <div
                    key={index}
                    onClick={() => {
                      setMonth(item)
                    }}
                    className={`text-center cursor-pointer py-[7px] rounded text-sm ${
                      month == item ? 'font-bold bg-blue text-white' : 'font-normal'
                    }`}
                  >
                    {item}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-[300px] gap-2 text-base text-gray ">
            <p>(2) Trip duration (approx)</p>
            <div className="p-5 grid grid-cols-2 bg-white gap-4 rounded shadow-md h-full">
              {Durations.map((item: any) => (
                <div
                  key={item?.name}
                  onClick={() => {
                    setDuration(item?.name)
                  }}
                  className={`rounded border border-darkblue/10 py-[14px] text-center text-sm cursor-pointer ${
                    duration == item?.name && 'bg-blue text-white'
                  } ${item.gridSpan}`}
                >
                  {item?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
