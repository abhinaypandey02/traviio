import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'

import { localizedString } from '@/contexts/LocaleProvider'
import client, { urlFor } from '@/sanity/client'
import {
  SanityDestinationPage,
  SanityGlobals,
  SanityLocale,
  SanityTailorYourTour,
} from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import Button from '@/components/buttons/Button'
import Container from '@/components/Container'
import Layout from '@/components/layout'
import FAQSection from '@/components/sections/FAQSection'
import SelectDestinationStep from '@/components/sections/Tailor Your Tour/SelectDestinationStep'
import Step1 from '@/components/sections/Tailor Your Tour/Step1'
import Step2, { TailorTripFormData } from '@/components/sections/Tailor Your Tour/Step2'
import Steps from '@/components/sections/Tailor Your Tour/Steps'

type TailorYourTourPageProps = {
  data: SanityTailorYourTour
  globals: SanityGlobals
  destinations: SanityDestinationPage[]
} & LocalePage
export default function TailorYourTour({
  data,
  locale,
  destinations,
  globals,
}: TailorYourTourPageProps) {
  const [duration, setDuration] = useState<string>()
  const [formData, setFormData] = useState<TailorTripFormData>()
  const [selectedDestination, setSelectedDestination] = useState<string>('')
  return (
    <Layout locale={locale} breadcrumbs={[]} globals={globals}>
      <Container>
        {/* {!selectedDestination && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {destinations.map((d, ind) => (
              <div
                key={ind}
                onClick={() => setSelectedDestination(d._id)}
                className="relative w-full h-[224px] rounded-xl overflow-hidden"
              >
                {d.meta_data?.meta_image && (
                  <Image
                    src={urlFor(d.meta_data?.meta_image)}
                    alt={localizedString(d.meta_data.meta_title, locale)}
                    fill
                    className="object-cover object-center"
                  />
                )}
                <Button
                  text={localizedString(d.meta_data?.meta_title, locale)}
                  className={`w-fit px-4 text-base absolute z-10 bottom-3 left-3 cursor-pointer ${
                    selectedDestination == d._id && 'bg-white/40 backdrop-blur'
                  }`}
                  style={{
                    width: 'fit-content',
                  }}
                  onClick={() => {
                    setSelectedDestination(d._id)
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {selectedDestination && ( */}
        <Steps
          disableNext={selectedDestination == ''}
          onSubmit={() => {
            fetch('/api/email', {
              method: 'POST',
              body: JSON.stringify({
                subject: 'New Tailor Tour Request',
                text: `You received a new "Tailor your tour" request by ${formData?.name}! Following are the details:
                  
                    Destination: ${destinations.find((d) => d._id === selectedDestination)
                      ?.meta_data?.meta_title?.en}
                    Duration: ${duration}
                    Email: ${formData?.email}  
                    Budget: ${formData?.budget}  
                    Nationality: ${formData?.nationality}  
                    Adults: ${formData?.numberOfAdults}  
                    Children: ${formData?.numberOfChildrens}  
                    Phone: ${formData?.phone}  
                    Categories: ${formData?.categories}  
                    More Info: ${formData?.moreInfo}  
                  `,
              }),
            }).then(() => {
              alert(`Request successfully submitted. You shall hear from us soon!`)
            })
          }}
        >
          <SelectDestinationStep
            destinations={destinations}
            locale={locale}
            selectedDestination={selectedDestination}
            setSelectedDestination={setSelectedDestination}
          />
          <Step1 onChange={setDuration} />
          <Step2 onChange={setFormData} />
        </Steps>
        {/* )} */}

        {data.step_1?.faq_section && <FAQSection data={data.step_1?.faq_section} />}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<TailorYourTourPageProps> = async ({ locale }) => {
  const tailorYourTourPageData = (await client.fetch(
    `*[_type == "tailor_your_tour"||_type=="destination_page"]`
  )) as (SanityTailorYourTour | SanityDestinationPage)[]
  const destinations = tailorYourTourPageData.filter(
    (x) => x?._type === 'destination_page'
  ) as SanityDestinationPage[]
  const globals = (await client.fetch(`*[_type == "globals"][0]{
    ...,
    navbar {
  ...,
      links[] {
        ...,
        _type == "tour_dropdown" => {
          ...,
          destinations[] {
            ...,
            destination->,
            tours[]->,
            blogs[]->,
          }
        }
      }
}
}`)) as SanityGlobals
  return {
    props: {
      data: tailorYourTourPageData.find(
        (x) => x?._type === 'tailor_your_tour'
      ) as SanityTailorYourTour,
      destinations,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
