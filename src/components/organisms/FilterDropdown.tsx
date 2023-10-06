import React from 'react'
import Image from 'next/image'

interface FilterDropdownProps {
  items: {
    title: string
    subitems: string[]
    selectedItem: string
    selectionToggle: (item: string) => void
  }[]
  selectedItemToggle?: (item: string) => void
  className?: string
}

function FilterItem(props: {
  title: string
  selectedItem: string
  selectionToggle: (item: string) => void
  subitems: string[]
  index: number
  openToggle: (open: number) => void
  open: boolean
}) {
  return (
    <div className="flex flex-col rounded-md shadow-md bg-white">
      {/* Selector */}
      <div
        className="rounded-t-md bg-primary flex justify-between p-5 cursor-pointer"
        onClick={() => {
          props.openToggle?.(props.index)
        }}
      >
        <p className='font-[500] text-[18px]'> {props.title}</p>
        <Image
          src="/down_icon.svg"
          height={28}
          width={28}
          alt="arrow"
          className={`${props.open ? '-rotate-180' : ''} transition-all`}
        />
      </div>
      {/* Dropdown */}
      {props.open && (
        <div className="rounded-b-md grid grid-cols-2  gap-3 gap-y-6 m-3">
          {props.subitems?.map((item, index) => {
            return (
              <div className="" key={index}>
                <div
                  className="flex gap-x-2 cursor-pointer"
                  onClick={() => {
                    props.selectionToggle?.(item)
                  }}
                >
                  <Image
                    src={
                      item === props.selectedItem ? '/selected-radio.svg' : '/unselected-radio.svg'
                    }
                    height={22}
                    width={22}
                    alt="dropdown-arrow"
                    className="transition-all"
                  />
                  <p
                    className={`${
                      item === props.selectedItem ? 'text-blue font-[500] text-[14px]' : 'text-gray font-[500] text-[14px]'
                    } font-medium transition-all`}
                  >
                    {item}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FilterDropdown(props: FilterDropdownProps) {
  const [open, setOpen] = React.useState<number>(-1)
  return (
    <div className={'flex flex-col gap-5 ' + props.className}>
      {props.items.map((item, index) => {
        return (
          <FilterItem
            title={item.title}
            open={open === index}
            openToggle={() => {
              setOpen(open === index ? -1 : index)
            }}
            selectedItem={item.selectedItem}
            selectionToggle={(s) => {
              item.selectionToggle(s)
            }}
            subitems={item.subitems}
            index={index}
            key={index}
          />
        )
      })}
    </div>
  )
}

export default FilterDropdown
