import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { LocalizedString, localizedString } from '@/contexts/LocaleProvider'
import { SanityGlobals, SanityLink } from '@/sanity/types'

function HeaderLink({
  item,
}: {
  item: NonNullable<NonNullable<SanityGlobals['navbar']>['links']>[number]
}) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  return (
    <>
      {item._type === 'link' && (
        <Link
          href={item.url || '/'}
          className={'font-medium ' + (item.url === router.route ? 'text-blue' : 'text-darkblue')}
        >
          <LocalizedString text={item.text} />
        </Link>
      )}
      {item._type === 'dropdown' && (
        <>
          <div className={'flex items-center'}>
            <span className="flex items-center cursor-pointer" onClick={() => setOpen(!open)}>
              <p className={'font-medium'}>
                <LocalizedString text={item.title} />
              </p>
              <Image
                src="/down_icon.svg"
                height="16"
                width="16"
                alt=""
                className={`ml-1 ${open && '-rotate-180'} transition-all`}
              ></Image>
            </span>

            <div
              className={
                'p-5 w-screen max-h-[70vh] overflow-scroll bg-primary transition-all shadow-md absolute top-[100%] left-0 -z-[10]' +
                (open ? '' : ' hidden')
              }
              onClick={() => setOpen(false)}
            >
              <div className="w-[90%] mx-auto grid gap-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-1 min-h-fit">
                {item.links?.map((child, index) => {
                  return (
                    <Link href={child.url || '/'} key={index}>
                      <LocalizedString text={child.text} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HeaderLink
