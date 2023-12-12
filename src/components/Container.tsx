import React, { PropsWithChildren } from 'react'

interface PropsType {
  className?: string
  id?: string
  style?: any
}

function Container(props: PropsWithChildren<PropsType>) {
  return (
    <section
      id={props.id}
      style={props.style}
      className={'mx-auto max-w-[1312px] px-4 w-full ' + props.className}
    >
      {props.children}
    </section>
  )
}

export default Container
