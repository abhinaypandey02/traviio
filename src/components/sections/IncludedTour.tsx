import Image from 'next/image'
import React from 'react'

interface IIncludedTour {
  icon: string
  title: string
  description?: string
  bullets?: string[]
}

function DisplayTab({ item }: { item: IIncludedTour }) {
  return (
    <div className="flex flex-col my-2 mx-2 text-darkblue">
      <div className="flex">
        <Image
          src={item.icon}
          height={26}
          width={26}
          alt={item.title}
          style={{ fill: 'yellow', stroke: 'yellow' }}
        />
        <div className="text-center my-3 font-medium md:text-start text-lg   leading-[20px] md:leading-[24px] px-[8px]">
          {item.title}
          <hr className="w-[80%] border-yellow border-2 border-t-0 my-1" />
        </div>
      </div>
      <p className="text-md  leading-[20px] md:leading-[24px] px-[8px]">{item.description}</p>
      <div className="flex flex-col gap-2 my-3">
        {item.bullets?.map((bullet, index) => (
          <div className="flex" key={index}>
            <p className="text-md  leading-[20px] md:leading-[24px] px-[8px]">{bullet}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function IncludedTour({ items }: { items: IIncludedTour[] }) {
  const [curr, setCurr] = React.useState(0)
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    setCollapsed(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setCollapsed(window.innerWidth < 768)
    })
  }, [])

  return (
    <>
      {collapsed && (
        <div className="overflow-hidden shadow-md w-[90%] mx-auto rounded-md">
          <div className="flex w-full justify-evenly px-2 gap-2 bg-blue">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setCurr(index)}
                  className={`${
                    curr === index ? 'border-b-2' : 'opacity-50'
                  } border-yellow cursor-pointer`}
                >
                  <Image
                    src={item.icon}
                    height={26}
                    width={26}
                    alt={item.title}
                    key={index}
                    className="my-1"
                    style={{ fill: 'white', stroke: 'white' }}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex flex-col px-2">
            <DisplayTab item={items[curr]} />
          </div>
        </div>
      )}
      {!collapsed && (
        <table className='w-[90%] mx-auto divide-y-2 divide-gray divide-opacity-20'>
          {items.map((item, index) => {
            return (
              <tr key={index} className=''>
                <td className="w-fit flex gap-2 text-blue my-4 mr-4">
                  <Image src={item.icon} height={40} width={40} alt={item.title} />
                  <p>{item.title}</p>
                </td>
                <td className="">
                  <p>{item.description}</p>
                  <div className="flex gap-2">
                    {item.bullets?.map((bullet, index) => {
                      return (
                        <div className="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                          <div className="h-2 w-2 rounded-full bg-black"></div>
                          <p>{bullet}</p>
                        </div>
                      )
                    })}
                  </div>
                </td>
              </tr>
            )
          })}
        </table>
      )}
    </>
  )
}

export default IncludedTour
