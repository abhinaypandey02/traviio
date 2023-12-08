import React, { useCallback, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

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
import Step2 from '@/components/sections/Tailor Your Tour/Step2'
import Steps from '@/components/sections/Tailor Your Tour/Steps'
import SEO from '@/components/Seo'

type TailorYourTourPageProps = {
  data: SanityTailorYourTour
  globals: SanityGlobals
  destinations: SanityDestinationPage[]
} & LocalePage

export type TailorTripFormData = {
  selectedDestination: string
  duration: string
  name: string
  email: string
  nationality: string
  phone: string
  numberOfAdults: string
  numberOfChildrens: string
  budget: string
  categories: string[]
  moreInfo: string
}

export const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )

export default function TailorYourTour({
  data,
  locale,
  destinations,
  globals,
}: TailorYourTourPageProps) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const [loading, setLoading] = useState(false)
  const validationSchema = yup.object({
    selectedDestination: yup.string().required('Required'),
    duration: yup.string().required('Required'),
    name: yup.string().required('Required'),
    email: yup.string().email('Enter a Valid Email').required('Required'),
    nationality: yup.string().required('Required'),
    mobileNumber: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    mobileCode: yup.string().required('Required'),
    numberOfAdults: yup
      .string()
      .required('Required')
      .test({ message: 'Should be atleast 1', test: (value) => parseInt(value || '0') > 0 }),
    numberOfChildrens: yup.string().required('Required'),
    budget: yup.string().required('Required'),
    categories: yup
      .array()
      .of(yup.string())
      .test({
        message: 'Select Atleast One Category',
        test: (value) => {
          return value == null || value.length > 0
        },
      }),
  })

  const resolver = useYupValidationResolver(validationSchema)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TailorTripFormData>({
    defaultValues: {
      categories: [],
      numberOfAdults: '0',
      numberOfChildrens: '0',
    },
    resolver,
  })

  return (
    <Layout locale={locale} breadcrumbs={[]} globals={globals}>
      <SEO title={'Tailor your tour'} />
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
          loading={loading}
          disableNext={getValues('selectedDestination') == ''}
          onSubmit={handleSubmit((data) => {
            setLoading(true)
            fetch('/api/email', {Featre
              method: 'POST',
              body: JSON.stringify({
                subject: 'New Tailor Tour Request',
                text: `You received a new "Tailor your tour" request by ${data?.name}! Following are the details:
                  
                    Destination: ${destinations.find((d) => d._id === data?.selectedDestination)
                      ?.meta_data?.meta_title?.en}
                    Duration: ${data?.duration}
                    Email: ${data?.email}
                    Budget: ${data?.budget}  
                    Nationality: ${data?.nationality}  
                    Adults: ${data?.numberOfAdults}  
                    Children: ${data?.numberOfChildrens}  
                    Phone: ${data?.phone}  
                    Categories: ${data?.categories}  
                    More Info: ${data?.moreInfo}  
                  `,
              }),
            })
              .then(() => {
                alert(`Request successfully submitted. You shall hear from us soon!`)
              })
              .finally(() => setLoading(false))
          })}
        >
          <SelectDestinationStep
            destinations={destinations}
            locale={locale}
            selectedDestination={getValues('selectedDestination')}
            setSelectedDestination={(value: string) => {
              setValue('selectedDestination', value, { shouldValidate: true })
            }}
          />
          <Step1
            onChange={(value) => {
              setValue('duration', value, { shouldValidate: true })
            }}
          />
          <Step2 setValue={setValue} control={control} />
        </Steps>
        {/* )} */}

        {data.step_1?.faq_section && <FAQSection locale={locale} data={data.step_1?.faq_section} />}
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
