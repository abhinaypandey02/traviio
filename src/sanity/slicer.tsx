import React, { FunctionComponent } from 'react'

export default function Slicer({
  sections,
  components,
}: {
  sections?: ({ _type: string; _key: string } & { [x in string]: any })[]
  components: { [name in string]: FunctionComponent<any> }
}) {
  return (
    <div>
      {sections?.map((section) => (
        <React.Fragment key={section._key}>
          {components[section._type] &&
            React.createElement(components[section._type], {
              data: section,
            })}
        </React.Fragment>
      ))}
    </div>
  )
}
