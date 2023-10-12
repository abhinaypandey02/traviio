import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { LocalizedString, localizedString } from '@/contexts/LocaleProvider'
import { SanityGlobals, SanityLink } from '@/sanity/types'
import Selector from './Selector'
import Card from './Card'
import { urlFor } from '@/sanity/client'
import Container from '@/components/Container'

function HeaderLink({
  item,
}: {
  item: NonNullable<NonNullable<SanityGlobals['navbar']>['links']>[number]
}) {
  const [open, setOpen] = React.useState(false)
  const [dest, setDest] = React.useState(0)
  const router = useRouter()
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    console.log(open)
  }, [open])
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
      {item._type === 'tour_dropdown' && (
        <>
          <div className={'flex items-center'}>
            <span className="flex items-center cursor-pointer" onClick={() => setOpen(!open)}>
              <p className={'font-medium'}>Destinations</p>
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
                'w-screen max-h-[70vh] min-h-fit overflow-scroll bg-primary transition-all shadow-md absolute top-[100%] left-0 lg:top-[100px] z-[15] h-fit' +
                (open ? '' : ' hidden')
              }
              onClick={() => setOpen(false)}
            >
              <Container className=" grid gap-3 lg:grid-cols-5 md:grid-cols-3 grid-cols-1 my-5">
                <Selector
                  title={localizedString(item.destinations_title)}
                  items={item.destinations?.map((item, index) => {
                    return localizedString(item.destination?.name)
                  })}
                  selectedItem={dest}
                  selectedItemToggle={setDest}
                />
                <div className="flex flex-col gap-2">
                  <p className="font-semibold mb-2">{localizedString(item.tours_title)}</p>
                  {item.destinations
                    ?.filter((item, index) => {
                      return index === dest
                    })[0]
                    .tours?.map((item, index) => {
                      return (
                        <Link
                          href={`/tours/${item.slug.current}`}
                          key={index}
                          className="hover:text-blue transition-all"
                        >
                          <p className="font-medium text-sm cursor-pointer">
                            {localizedString(item.hero_section.title)}
                          </p>
                        </Link>
                      )
                    })}
                </div>
                <div className='col-span-3 grid grid-cols-3 gap-[18px]'>
                  {item.destinations
                    ?.filter((item, index) => {
                      return index === dest
                    })[0]
                    .blogs?.slice(0, 3)
                    .map((item, index) => {
                      return (
                        <Card
                          link=""
                          image={urlFor(item.cover_image)}
                          title={localizedString(item.title)}
                          excerpt={localizedString(item.introduction)}
                          key={index}
                        />
                      )
                    })}
                </div>
              </Container>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HeaderLink
