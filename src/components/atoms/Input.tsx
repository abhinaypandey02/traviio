import React, { useEffect } from 'react'
import { Control, RegisterOptions, useController } from 'react-hook-form'

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
    | 'date'
    | 'textarea'
  control: Control<any>
  variant?: 'primary' | 'secondary'
  placeholder?: string
  label?: any
  options?: { label: string; value: any }[] | { name: string; icon: any }[]
  className?: string
  checkboxValue?: any
  rules?: RegisterOptions
  disabled?: boolean
  editable?: boolean
  defaultValue?: any
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
export const ERROR_MESSAGES = {
  required: 'Required',
}
export default function Input({
  name,
  control,
  type,
  variant = 'primary',
  placeholder,
  label,
  options,
  className,
  checkboxValue,
  disabled,
  rules,
  defaultValue,
  editable = true,
}: Props) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules, defaultValue })
  const errorMsg = error?.type
    ? ERROR_MESSAGES[error.type as keyof typeof ERROR_MESSAGES] || error.message || 'Error'
    : undefined
  useEffect(() => {
    field.onChange(defaultValue)
  }, [defaultValue])
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
                field.onChange(Math.max(parseInt(field.value || '0') - 1, 1).toString(), 'members')
              }}
            >
              {<Minus color="white" />}
            </div>
            <div
              className={`w-[22px] h-[22px] ${VARIANT.buttonNumber.display[variant]} text-black flex items-center justify-center select-none`}
            >
              {field.value}
            </div>
            <div
              className={`w-[22px] h-[22px] ${VARIANT.buttonNumber.button[variant]} flex items-center justify-center`}
              onClick={() => {
                field.onChange(Math.min(parseInt(field.value || '0') + 1, 30).toString(), 'members')
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
          disabled={disabled}
          id={name}
          className={`border bg-white border-darkblue/10 text-gray rounded p-1 ${className}`}
          {...field}
          placeholder="Select"
        >
          <option>{placeholder}</option>

          {(options as { label: string; value: any }[])?.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    )
  if (['text', 'number', 'password', 'date'].includes(type))
    return (
      <div className="flex  font-medium text-base text-black flex-col gap-2">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          disabled={disabled}
          id={name}
          type={type}
          placeholder={placeholder}
          className="border border-darkblue/10 text-gray rounded p-1 min-w-0"
          // value={value}
          // onChange={(e) => {
          //   setValue(type === 'number' ? parseInt(e.target.value) : e.target.value)
          // }}
          {...field}
        />
        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    )
  if (type == 'checkbox')
    return (
      <div
        className={`h-6 w-6 flex justify-center items-center rounded-lg border ${
          field.value === checkboxValue
            ? !editable
              ? 'bg-gray cursor-not-allowed '
              : 'bg-blue border-blue'
            : errorMsg
            ? 'bg-white border-red'
            : disabled
            ? 'bg-gray/10 cursor-not-allowed '
            : 'bg-white  border-gray'
        }`}
        onClick={() => {
          if (!editable) return
          if (field.value === checkboxValue) field.onChange(undefined)
          else if (!disabled) field.onChange(checkboxValue)
        }}
      >
        {(!disabled || field.value) && <Check color="white" width={16} height={16} weight="bold" />}
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
                field.value.includes(option.name) ? 'text-white bg-blue' : 'text-gray bg-white'
              } px-3 py-[10px] text-sm gap-2 items-center whitespace-nowrap flex-nowrap`}
              onClick={() => {
                if (field.value.includes(option.name)) {
                  field.onChange(field.value.filter((item: any) => item != option.name))
                } else {
                  field.onChange([...field.value, option.name])
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
          disabled={disabled}
          id={name}
          rows={3}
          className="border border-darkblue/10 text-gray rounded p-1"
          {...field}
        />

        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    )
  return <></>
}
