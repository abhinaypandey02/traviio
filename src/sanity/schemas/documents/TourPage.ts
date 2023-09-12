import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { SuitcaseRolling } from '@phosphor-icons/react'

import { TourSections } from '../sections/Tours'

export default defineType({
  name: 'tour_page',
  title: 'Tour Pages',
  icon: SuitcaseRolling,
  type: 'document',
  fields: [
    defineField({
      name: 'meta_data',
      title: 'Meta Data',
      description: 'Meta Data for SEO',
      type: 'meta_data',
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      description: 'Destination this tour is meant for',
      type: 'reference',
      to: [{ type: 'destination_page' }],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Slug for the page',
      type: 'slug',
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
      name: 'overview_card',
      title: 'Overview Card',
      description: 'Overview card for the page',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'duration',
          title: 'Duration',
          description: 'Duration of the tour',
          type: 'locale_string',
        }),
        defineField({
          name: 'countries',
          title: 'Number of Countries',
          description: 'Number of countries in the tour',
          type: 'number',
        }),
        defineField({
          name: 'cities',
          title: 'Number of cities',
          description: 'Number of cities in the tour',
          type: 'number',
        }),
        defineField({
          name: 'rating',
          title: 'Rating',
          description: 'Rating of the tour',
          type: 'number',
        }),
        defineField({
          name: 'about',
          title: 'About',
          description: 'About the tour',
          type: 'locale_string',
        }),
        defineField({
          name: 'price',
          title: 'Price',
          description: 'Price of the tour',
          type: 'locale_string',
        }),
        defineField({
          name: 'cta_button',
          title: 'CTA Button',
          description: 'CTA button for the tour',
          type: 'link_button',
        }),
        defineField({
          name: 'cta_helper_text',
          title: 'CTA Helper Text',
          description: 'CTA helper text for the tour',
          type: 'locale_string',
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Sections for the page',
      type: 'array',
      of: TourSections.map((tour_section) => ({ type: tour_section })),
    }),
  ],
  preview: {
    select: {
      title: 'meta_data.meta_title.en',
      destination: 'destination.title.en',
      subtitle: 'slug.current',
      media: 'meta_data.meta_image',
      sections: 'sections',
    },
    prepare: ({ title, subtitle, media, sections, destination }) => {
      return {
        title: joinStrings(':', destination || 'No Destination', title || 'No title'),
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
