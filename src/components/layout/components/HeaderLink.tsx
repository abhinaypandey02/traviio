import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type TLink = {
  name: string
  type: 'link'
  route: string
}

type TDropdown = {
  name: string
  type: 'dropdown'
  children: (TLink | TDropdown)[]
}

function HeaderLink({ item }: { item: TLink | TDropdown }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  return (
    <>
      {item.type === 'link' && (
        <Link
          href={item.route}
          className={item.route === router.route ? 'text-blue' : 'text-darkblue'}
        >
          {item.name}
        </Link>
      )}
      {item.type === 'dropdown' && (
        <>
          <div
            className={'relative flex items-center cursor-pointer'}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <span onClick={() => {setOpen(!open)}} className='flex items-center'>
                <p>{item.name}</p>
                <Image src="/down_icon.svg" height="16" width="16" alt="" className='mx-2'></Image>
            </span>
            {open && (
              <div className="p-5 w-fit flex flex-col gap-2 bg-primary border-blue border rounded-xl absolute top-[100%] left-1/2">
                {item.children.map((element, index) => {
                  return <HeaderLink item={element} key={index} />
                })}
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default HeaderLink
