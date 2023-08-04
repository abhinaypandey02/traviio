import { defineType } from 'sanity'

import { sections } from '../sections'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'sections',
      title: 'Sections',
      description: 'Sections of the page',
      type: 'array',
      of: sections.map((section) => ({ type: section })),
    },
  ],
})
