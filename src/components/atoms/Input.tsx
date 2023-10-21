import React from 'react'

import { Check, Minus, Plus } from '@phosphor-icons/react'

interface Props {
  name: string
  type:
    | 'buttonNumber'
    | 'select'
    | 'text'
    | 'number'
    | 'password'
    | 'checkbox'
    | 'boxSelection'
    | 'textarea'
  register?: any
  value?: any
  setValue?: any
  variant?: 'primary' | 'secondary'
  placeholder?: string
  label?: any
  options?: string[] | number[] | { name: string; icon: any }[]
  className?: string
  errorMsg?: any
}

const VARIANT = {
  buttonNumber: {
    button: {
      primary: 'bg-yellow',
      secondary: 'bg-blue',
    },
    display: {
      primary: 'bg-white',
      secondary: 'bg-white',
    },
  },
}

export default function Input({
  name,
  register = (value: any) => {},
  type,
  value,
  setValue,
  variant = 'primary',
  placeholder,
  label,
  options,
  className,
  errorMsg,
}: Props) {
  if (type == 'buttonNumber')
    return (
      <div className={`flex font-medium text-base text-black flex-col gap-2 ${className}`}>
        {label && <p>{label}</p>}
        <div className="border border-darkblue/10 flex gap-2 bg-white p-2 justify-between rounded">
          <div className="font-normal text-sm">{placeholder}</div>
          <div className="flex">
            <div
              className={`w-[22px] h-[22px] ${VARIANT.buttonNumber.button[variant]} flex items-center justify-center`}
              onClick={() => {
                setValue(Math.max(parseInt(value || '0') - 1, 1).toString(), 'members')
              }}
            >
              {<Minus color="white" />}
            </div>
            <div
              className={`w-[22px] h-[22px] ${VARIANT.buttonNumber.display[variant]} text-black flex items-center justify-center select-none`}
            >
              {value}
            </div>
            <div
              className={`w-[22px] h-[22px] ${VARIANT.buttonNumber.button[variant]} flex items-center justify-center`}
              onClick={() => {
                setValue(Math.min(parseInt(value || '0') + 1, 30).toString(), 'members')
              }}
            >
              {<Plus color="white" />}
            </div>
          </div>
        </div>
        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    )
  if (type == 'select')
    return (
      <div className="flex  font-medium text-base text-black flex-col gap-2">
        {label && <label htmlFor={name}>{label}</label>}
        <select
          id={name}
          className={`border bg-white border-darkblue/10 text-gray rounded p-1 ${className}`}
          {...register(name)}
          {...(setValue
            ? {
                value: { value },
                onChange: (e) => {
                  setValue(e.target.value)
                },
              }
            : {})}
          placeholder="Select"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {(options as string[] | number[])?.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    )
  if (['text', 'number', 'password'].includes(type))
    return (
      <div className="flex  font-medium text-base text-black flex-col gap-2">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className="border border-darkblue/10 text-gray rounded p-1 min-w-0"
          // value={value}
          // onChange={(e) => {
          //   setValue(type === 'number' ? parseInt(e.target.value) : e.target.value)
          // }}
          {...register(name)}
          {...(setValue
            ? {
                value: { value },
                onChange: (e) => {
                  setValue(e.target.value)
                },
              }
            : {})}
        />
        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    )
  if (type == 'checkbox')
    return (
      <div
        className={`h-6 w-6 flex justify-center items-center rounded-lg border ${
          value ? 'bg-blue border-blue' : 'bg-white  border-gray'
        }`}
        onClick={() => {
          setValue()
        }}
      >
        <Check color="white" width={16} height={16} weight="bold" />
      </div>
    )
  if (type == 'boxSelection')
    return (
      <div className="flex w-full font-medium text-base text-black flex-col gap-2">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="flex justify-center gap-3 flex-wrap">
          {options?.map((option: any) => (
            <div
              className={`flex border w-fit border-darkblue/10 rounded ${
                value.includes(option.name) ? 'text-white bg-blue' : 'text-gray bg-white'
              } px-3 py-[10px] text-sm gap-2 items-center whitespace-nowrap flex-nowrap`}
              onClick={() => {
                if (value.includes(option.name)) {
                  setValue(value.filter((item: any) => item != option.name))
                } else {
                  setValue([...value, option.name])
                }
              }}
            >
              {option.icon} {option.name}
            </div>
          ))}
        </div>
        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    )
  if (type == 'textarea')
    return (
      <div className="flex  font-medium text-base text-black flex-col gap-2">
        {label && <label htmlFor={name}>{label}</label>}

        <textarea
          id={name}
          rows={3}
          className="border border-darkblue/10 text-gray rounded p-1"
          {...register(name)}
          {...(setValue
            ? {
                value: { value },
                onChange: (e) => {
                  setValue(e.target.value)
                },
              }
            : {})}
        />

        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    )
  return <></>
}
