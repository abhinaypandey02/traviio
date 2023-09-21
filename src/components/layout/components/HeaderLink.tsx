import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

type TLink = {
  name: string
  type: 'link'
  route: string
}

type TDropdown = {
  name: string
  type: 'dropdown'
  children: (ReactNode)[]
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
          <div className={'flex items-center'}>
            <span className="flex items-center cursor-pointer" onClick={() => setOpen(!open)}>
              <p>{item.name}</p>
              <Image
                src="/down_icon.svg"
                height="16"
                width="16"
                alt=""
                className={`mx-2 ${open && '-rotate-180'} transition-all`}
              ></Image>
            </span>
            {
              <div
                className={
                  'p-5 w-screen bg-primary transition-all shadow-md absolute top-[100%] left-0 ' +
                  (open ? ' ' : 'hidden')
                }
              >
                <div className="w-[90%] mx-auto grid gap-5 grid-cols-5 min-h-fit">
                  {
                    item.children.map((child, index) => {
                      return (
                        <div key={index}>
                          {child} 
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            }
          </div>
        </>
      )}
    </>
  )
}

export default HeaderLink
