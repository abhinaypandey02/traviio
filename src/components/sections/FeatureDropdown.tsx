import React from 'react'
import Image from 'next/image'

interface FeatureSingleItem {
  title: string
  subitems: {
    title: string
    color: 'blue' | 'gray'
  }[]
}

interface FeatureItemProps {
  title: string
  open: boolean
  openToggle?: (open: string) => void
  selectedItem?: FeatureSingleItem
  selectedItemToggle?: (item: FeatureSingleItem) => void
  items?: FeatureSingleItem[]
}

interface FeatureDropdownProps {
  items: {
    title: string
    subitems: FeatureSingleItem[]
  }[]
  selectedItemToggle?: (item: string) => void
}

function FeatureItem(props: FeatureItemProps) {
  return (
    <div className="flex flex-col rounded-md shadow-md bg-white">
      {/* Selector */}
      <div
        className="rounded-t-md bg-primary flex justify-between p-5 cursor-pointer"
        onClick={() => {
          props.openToggle?.(props.title)
        }}
      >
        <p>{props.title}</p>
        <Image src="down_icon.svg" height={28} width={28} alt="arrow" className={`${props.open ? "-rotate-180" : ""} transition-all`}/> 
      </div>
      {/* Dropdown */}
      {props.open && (
        <div className="rounded-b-md flex flex-col gap-3 m-3">
          {props.items?.map((item, index) => {
            return (
              <div className="" key={index}>
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => {
                    props.selectedItemToggle?.(item)
                  }}
                >
                  <Image
                    src={item === props.selectedItem ? 'blue_arrow.svg' : 'down_icon.svg'}
                    height={22}
                    width={22}
                    alt="dropdown-arrow"
                    className='transition-all'
                  />
                  <p className={`${item === props.selectedItem ? 'text-blue' : ''} font-medium transition-all`}>
                    {item.title}
                  </p>
                </div>
                {item === props.selectedItem && (
                  <div className="ml-5 my-2 flex flex-col gap-3">
                    {item.subitems.map((subitem, index) => {
                      return (
                        <div className="flex gap-2">
                          <Image
                            src={subitem.color === 'blue' ? 'blue_bullet.svg' : 'gray_bullet.svg'}
                            height={22}
                            width={22}
                            alt="bullet"
                          />
                          <p className={`${subitem.color === 'blue' ? 'text-blue' : ''} `}>
                            {subitem.title}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FeatureDropdown(props: FeatureDropdownProps) {
  const [open, setOpen] = React.useState<string>('')
  const [selectedItem, setSelectedItem] = React.useState<FeatureSingleItem>()
  return (
    <div className="flex flex-col gap-5">
      {props.items.map((item, index) => {
        return (
          <FeatureItem
            title={item.title}
            open={open === item.title}
            openToggle={(title) => {
              setOpen(open === title ? "" : title)
            }}
            selectedItem={selectedItem}
            selectedItemToggle={(item) => {
              setSelectedItem(item)
              props.selectedItemToggle?.(item.title)
            }}
            items={item.subitems}
            key={index}
          />
        )
      })}
    </div>
  )
}

export default FeatureDropdown
