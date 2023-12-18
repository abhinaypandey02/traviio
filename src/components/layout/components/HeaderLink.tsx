import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { LocalizedString, localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityGlobals, SanityLink } from '@/sanity/types'

import Container from '@/components/Container'

import Card from './Card'
import Selector from './Selector'

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
  }, [open])

  return (
    <>
      {item?._type === 'link' && (
        <Link
          href={item.url || '/'}
          className={
            'leading-[24px] flex-none ' +
            ((item.url || '/') === router.asPath ? 'text-blue font-bold' : 'text-darkblue font-medium')
          }
        >
          <LocalizedString text={item.text} />
        </Link>
      )}
      {item?._type === 'tour_dropdown' && (
        <>
          <div className={'hidden lg:flex items-center'}>
            <span className="flex items-center cursor-pointer" onClick={() => setOpen(!open)}>
              <p className={'font-medium leading-[24px]'}>Destinations</p>
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
                'w-full h-fit  overflow-scroll bg-white transition-all shadow-md absolute top-[100%] left-0 lg:top-[100px] -z-[1]' +
                (open ? ' translate-y-2' : ' -translate-y-[100%]')
              }
              onClick={() => setOpen(false)}
            >
              <div className="flex flex-wrap w-full lg:gap-[100px] gap-5 my-[52px] mx-20 h-fit min-h-[260px]">
                <div className="flex flex-wrap lg:gap-[85px] gap-5">
                  <Selector
                    title={localizedString(item.destinations_title)}
                    items={
                      item.destinations?.map((item, index) => {
                        return localizedString((item.destination as any)?.name)
                      }) as any[]
                    }
                    selectedItem={dest}
                    selectedItemToggle={setDest}
                  />
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold  mb-2">{localizedString(item.tours_title)}</p>
                    {(item.destinations as any[])
                      ?.filter((item, index) => {
                        return index === dest
                      })[0]
                      .blogs?.map((item: any, index: any) => {
                        return (
                          <Link href={`/blogs${item.slug.current}`}>
                            <p>{localizedString(item.title)}</p>
                          </Link>
                        )
                      })}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-[18px]">
                  {item.destinations
                    ?.filter((item, index) => {
                      return index === dest
                    })[0]
                    .tours?.slice(0, 3)
                    .map((item: any, index) => {
                      return (
                        <Card
                          link={`/tours${item.slug.current}`}
                          key={index}
                          excerpt={localizedString(item?.overview_card?.about)}
                          image={urlFor(item?.hero_section?.image)}
                          title={localizedString(item?.hero_section?.title)}
                        />
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HeaderLink
