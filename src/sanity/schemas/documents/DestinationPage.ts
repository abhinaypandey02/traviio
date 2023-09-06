import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { SuitcaseRolling } from '@phosphor-icons/react'

import { DestinationSections } from '../sections/Destination'

export default defineType({
  name: 'destination_page',
  title: 'Destination Pages',
  icon: SuitcaseRolling,
  type: 'document',
  fields: [
    defineField({
      name: 'destination_id',
      title: 'Destination ID',
      description: 'Destination ID for the page, will be used in the url',
      type: 'string',
    }),
    defineField({
      name: 'meta_data',
      title: 'Meta Data',
      description: 'Meta Data for SEO',
      type: 'meta_data',
    }),
    defineField({
      name: 'promo_banner',
      title: 'Promo Banner',
      description: 'Promo banner for the hero section',
      type: 'promo_banner',
    }),
    defineField({
      name: 'hero_section',
      title: 'Hero Section',
      description: 'Hero section for the page',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'locale_string',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Sections for the page',
      type: 'array',
      of: DestinationSections.map((destination_section) => ({ type: destination_section })),
    }),
  ],
  preview: {
    select: {
      title: 'meta_data.meta_title.en',
      destination_id: 'destination_id',
      subtitle: 'slug.current',
      media: 'meta_data.meta_image',
      sections: 'sections',
    },
    prepare: ({ title, destination_id, subtitle, media, sections }) => {
      return {
        title: destination_id || 'No id',
        subtitle: joinStrings('|', subtitle, title, displayNumber(sections?.length, 'section')),
        media,
      }
    },
  },
})
