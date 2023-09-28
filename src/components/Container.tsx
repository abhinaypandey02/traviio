import React, { PropsWithChildren } from 'react'

interface PropsType {
  className?: string
  id?: string
}

function Container(props: PropsWithChildren<PropsType>) {
  return (
    <div id={props.id} className={'mx-auto max-w-[1456px] px-4 ' + props.className}>
      {props.children}
    </div>
  )
}

export default Container