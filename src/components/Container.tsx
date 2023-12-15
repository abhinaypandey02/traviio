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
      className={'main-content-wrapper w-full ' + props.className}
    >
      {props.children}
    </section>
  )
}

export default Container
