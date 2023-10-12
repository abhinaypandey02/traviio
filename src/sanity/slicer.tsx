import React, { FunctionComponent, useContext } from 'react'

import LocaleContext from '@/contexts/LocaleProvider'
import { SanityGlobals, SanityPromoBanner } from '@/sanity/types'

import Layout from '@/components/layout'
import PromoBanner from '@/components/PromoBanner'

import Breadcrumbs, { Breadcrumb } from '@/components/atoms/Breadcrumbs'

export default function Slicer({
  sections,
  components,
  globals,
  breadcrumbs,
  promo_banner,
}: {
  sections?: ({ _type: string; _key: string } & { [x in string]: any })[]
  components: { [name in string]: FunctionComponent<any> }
  globals?: SanityGlobals
  breadcrumbs: Breadcrumb[]
  promo_banner?: SanityPromoBanner
}) {
  const { locale } = useContext(LocaleContext)
  return (
    <Layout locale={locale} promo_banner={promo_banner} breadcrumbs={breadcrumbs} globals={globals}>
      {sections?.map((section) => (
        <React.Fragment key={section._key}>
          {components[section._type] &&
            React.createElement(components[section?._type], {
              data: section,
              locale,
            })}
        </React.Fragment>
      ))}
    </Layout>
  )
}
