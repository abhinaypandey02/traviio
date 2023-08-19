import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Browser } from '@phosphor-icons/react'

import { sections } from '../sections'

export default defineType({
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: Browser,
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Slug for the page',
      type: 'slug',
    }),
    defineField({
      name: 'meta_data',
      title: 'Meta Data',
      description: 'Meta Data for SEO',
      type: 'meta_data',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Sections for the page',
      type: 'array',
      of: sections.map((section) => ({ type: section })),
    }),
  ],
  preview: {
    select: {
      title: 'meta_data.meta_title.en',
      subtitle: 'slug.current',
      media: 'meta_data.meta_image',
      sections: 'sections',
    },
    prepare: ({ title, subtitle, media, sections }) => {
      return {
        title: title || 'No title',
        subtitle: joinStrings(
          '|',
          subtitle || 'No slug',
          displayNumber(sections?.length, 'section')
        ),
        media,
      }
    },
  },
})
