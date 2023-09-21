import React from 'react'

function Selector(props: {
  title: string
  items: string[]
  selectedItem: string
  selectedItemToggle: (item: string) => void
}) {
  const { title, items, selectedItem, selectedItemToggle } = props
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold mb-2">{title}</p>
      {items.map((item, index) => {
        return (
          <div
            className={`${item == selectedItem ? 'text-blue' : ''} cursor-pointer hover:underline transition-all`}
            onClick={() => {
              selectedItemToggle(item)
            }}
          >
            {item}
          </div>
        )
      })}
    </div>
  )
}

export default Selector
