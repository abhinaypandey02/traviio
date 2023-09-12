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
      name: 'name',
      title: 'Name',
      description: 'Name of the destination',
      type: 'locale_string',
    }),
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
      name: 'name.en',
      subtitle: 'slug.current',
      media: 'meta_data.meta_image',
      sections: 'sections',
    },
    prepare: ({ title, name, subtitle, media, sections }) => {
      return {
        title: name || 'No name',
        subtitle: joinStrings('|', subtitle, title, displayNumber(sections?.length, 'section')),
        media,
      }
    },
  },
})
