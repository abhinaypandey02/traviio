import React from 'react'

import Container from '@/components/Container'

function TabSelector({
  tabs,
  selected,
  setSelected,
}: {
  tabs: string[]
  selected: number
  setSelected: (index: number) => void
}) {
  return (
    <div className={'border-b border-[#140D311A]'}>
      <Container
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
        className={'grid px-5 md:px-20'}
      >
        {tabs.map((tab, i) => (
          <div
            onClick={() => setSelected(i)}
            className={`cursor-pointer text-center py-5 ${
              selected === i ? 'font-medium border-b-[3px] border-yellow' : 'opacity-50'
            }`}
          >
            {tab}
          </div>
        ))}
      </Container>
    </div>
  )
}

export default TabSelector
