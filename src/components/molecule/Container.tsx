import React, { PropsWithChildren } from 'react'

function Container(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`max-w-[1280px] w-[90%] px-5 mx-auto ${props.className}`}>{props.children}</div>
  )
}

export default Container
