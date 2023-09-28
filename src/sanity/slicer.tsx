import React, { FunctionComponent } from 'react'

import { SanityGlobals } from '@/sanity/types'

import Layout from '@/components/layout'

export default function Slicer({
  sections,
  components,
  globals,
}: {
  sections?: ({ _type: string; _key: string } & { [x in string]: any })[]
  components: { [name in string]: FunctionComponent<any> }
  globals?: SanityGlobals
}) {
  return (
    <Layout globals={globals}>
      {sections?.map((section) => (
        <React.Fragment key={section._key}>
          {components[section._type] &&
            React.createElement(components[section._type], {
              data: section,
            })}
        </React.Fragment>
      ))}
    </Layout>
  )
}
