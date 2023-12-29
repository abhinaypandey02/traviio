/* eslint-disable prettier/prettier */
import { useState } from 'react'
import Image from 'next/image'

import classNames from '@/utils/classNames'
import { Disclosure } from '@headlessui/react'
import { CaretDown } from '@phosphor-icons/react'

import minusIcon from "../../../public/minus_icon.svg"
import minusIconBlue from "../../../public/minus_icon_blue.svg"

export default function Wiki_DisclosureItems({ dat }: any) {
    // console.log('filter',dat)
    // const [activeDisclosureId, setActiveDisclosureId] = useState<string | null>(null)

    // let tabs=[]
    // dat.map((item:any,index:any)=>{
    //     // console.log(item.nested_sections)
        
    //     let items=[]
        
    //     item?.nested_sections.map((it:any,ind:any)=>{
    //         // console.log(it)
    //         console.log(it.nested_sections)
    //         let ob={
    //             name:it.title.en,
    //             id:ind+1,

    //         }
    //         items.push(ob)
    //     })

    //     let obj={
    //         name:item.title.en,
    //         id:index+1,
    //         items:items
    //     }
    //     tabs.push(obj)
    // })
  
    const data = [
        {
            name: 'Egypt Travel Guide',
            id: "1",
            items: [
                {
                    name: 'Egypt Entry Visa / Visa Requirements to Egypt',
                    id: '1',
                    subItems: [
                        {
                            name: "Cairo Airport Facilities",
                            id: "1"
                        },
                        {
                            name: "Ahlan Service",
                            id: "2"
                        },
                        {
                            name: "VIP Private Lounge at Cairo Airport",
                            id: "3"
                        },
                    ],
                },
                {
                    name: 'Egypt Sightseeing / Egypt Main Attractions',
                    id: '2',
                    subItems: [
                        {
                            name: "Cairo Airport Facilities",
                            id: "4"
                        },
                        {
                            name: "Ahlan Service",
                            id: "5"
                        },
                        {
                            name: "VIP Private Lounge at Cairo Airport",
                            id: "6"
                        },
                    ],
                },
                {
                    name: 'Arrival Procedures at Cairo International Airport',
                    id: '3',
                    subItems: [
                        {
                            name: "Cairo Airport Facilities",
                            id: "7"
                        },
                        {
                            name: "Ahlan Service",
                            id: "8"
                        },
                        {
                            name: "VIP Private Lounge at Cairo Airport",
                            id: "9"
                        },
                    ],
                }
            ]

        },
        {
            name: 'Egypt Oases',
            id: "2",
            items: [
                {
                    name: 'Egypt Entry Visa / Visa Requirements to Egypt',
                    id: '1',
                    subItems: [
                        {
                            name: "Cairo Airport Facilities",
                            id: "1"
                        },
                        {
                            name: "Ahlan Service",
                            id: "2"
                        },
                        {
                            name: "VIP Private Lounge at Cairo Airport",
                            id: "3"
                        },
                    ],
                },
                {
                    name: 'Egypt Sightseeing / Egypt Main Attractions',
                    id: '2',
                    subItems: [
                        {
                            name: "Cairo Airport Facilities",
                            id: "1"
                        },
                        {
                            name: "Ahlan Service",
                            id: "2"
                        },
                        {
                            name: "VIP Private Lounge at Cairo Airport",
                            id: "3"
                        },
                    ],
                },
                {
                    name: 'Arrival Procedures at Cairo International Airport',
                    id: '3',
                    subItems: [
                        {
                            name: "Cairo Airport Facilities",
                            id: "1"
                        },
                        {
                            name: "Ahlan Service",
                            id: "2"
                        },
                        {
                            name: "VIP Private Lounge at Cairo Airport",
                            id: "3"
                        },
                    ],
                }
            ]

        },
        {

            name: 'Nile River Cruise',

            id: "3",

            items: [

                {

                    name: 'Cruise Options',

                    id: '1',

                    subItems: [

                        {
                            name: "Luxury Nile Cruises",
                            id: "1"

                        },
                        {
                            name: "Budget-Friendly Cruises",
                            id: "2"

                        },
                        {
                            name: "Family-Friendly Cruises",
                            id: "3"

                        },
                    ],

                },

                {

                    name: 'Highlights of the Nile',

                    id: '2',

                    subItems: [

                        {
                            name: "Valley of the Kings",
                            id: "4"

                        },
                        {
                            name: "Temple of Karnak",
                            id: "5"

                        },
                        {
                            name: "Aswan High Dam",
                            id: "6"

                        },
                    ],

                },

                {

                    name: 'Booking and Tips',

                    id: '3',

                    subItems: [

                        {
                            name: "How to Book a Nile Cruise",
                            id: "7"

                        },
                        {
                            name: "Packing Tips for the Cruise",
                            id: "8"

                        },
                        {
                            name: "Best Time to Cruise the Nile",
                            id: "9"

                        },
                    ],

                }

            ]

        },

        {

            name: 'Egyptian Cuisine',

            id: "4",

            items: [

                {

                    name: 'Traditional Dishes',

                    id: '1',

                    subItems: [

                        {
                            name: "Koshari",
                            id: "1"

                        },
                        {
                            name: "Ful Medames",
                            id: "2"

                        },
                        {
                            name: "Molokhia",
                            id: "3"

                        },
                    ],

                },

                {

                    name: 'Dining Etiquette',

                    id: '2',

                    subItems: [

                        {
                            name: "Use of Bread",
                            id: "4"

                        },
                        {
                            name: "Sharing Meals",
                            id: "5"

                        },
                        {
                            name: "Importance of Tea",
                            id: "6"

                        },
                    ],

                },

                {

                    name: 'Popular Desserts',

                    id: '3',

                    subItems: [

                        {
                            name: "Baklava",
                            id: "7"

                        },
                        {
                            name: "Basbousa",
                            id: "8"

                        },
                        {
                            name: "Umm Ali",
                            id: "9"

                        },
                    ],

                }

            ]

        },

    ]

    return (
        <div className="rounded-2xl space-y-6 lg:w-1/3">
            {data.map((item) => (
                <div className='bg-white shadow-disclosure rounded-t-2xl text-left overflow-hidden'>
                    <Disclosure key={item.id}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className={classNames(open ? "font-medium" : "font-normal", "bg-[#F2FAFF]  p-4 flex items-center w-full justify-between gap-4 x-4 py-4 text-left text-lg text-black")}>
                                    <span>{item.name}</span>
                                    <CaretDown
                                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 space-y-6">
                                    {item.items?.map((subItem) => (<Disclosure key={subItem.id}>
                                        {({ open: openSub }) => (
                                            <>
                                                <Disclosure.Button className={classNames(openSub ? "text-blue" : "text-gray", 'flex gap-4 px-4')}>
                                                    <CaretDown
                                                        className={`${openSub ? 'rotate-180 transform' : ''} h-4 w-4 mt-0.5`}
                                                    />
                                                    <p className={'text-sm text-left font-medium'}>
                                                        {subItem.name}
                                                    </p>
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="pl-[2.90rem] px-4 text-sm text-gray-500">
                                                    <ul className='flex flex-col gap-6 '>
                                                        {subItem.subItems.map((subSubItem, index) => {
                                                            return <li key={subSubItem.id}>
                                                                <button onClick={() => setActiveDisclosureId(subSubItem.id)}>
                                                                    <a className={classNames(activeDisclosureId === subSubItem.id ? 'text-blue' : 'text-gray', 'flex items-center gap-2')}>
                                                                        {activeDisclosureId === subSubItem.id ? <Image src={minusIconBlue} alt="minus blue" /> : <Image src={minusIcon} alt="minus" />}
                                                                        <p className="font-normal">{subSubItem.name}</p>
                                                                    </a>
                                                                </button>
                                                            </li>
                                                        })}
                                                    </ul>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>))}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure></div>))}

            <div className='flex items-center justify-center w-full lg:hidden'>
                <button className='text-blue border-b border-b-blue text-sm font-medium text-center'>
                    View All
                </button>
            </div>
        </div>
    )
}
