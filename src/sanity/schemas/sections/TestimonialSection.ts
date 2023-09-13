import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Megaphone } from '@phosphor-icons/react'

export const testimonial_section = defineType({
  name: 'testimonial_section',
  title: 'Testimonial Section',
  type: 'object',
  icon: Megaphone as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the testimonial section',
      type: 'locale_string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheading',
      description: 'Subtitle for the testimonial section',
      type: 'locale_string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Image for the testimonial section',
      type: 'image',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      description: 'Testimonials for the testimonial section',
      type: 'array',
      of: [defineArrayMember({ type: 'testimonial' })],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      testimonials: 'testimonials',
    },
    prepare: ({ title, testimonials }) => ({
      title: `Testimonial Section`,
      subtitle: joinStrings('|', title, displayNumber(testimonials?.length, 'Testimonial')),
    }),
  },
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name for the testimonial author',
      type: 'locale_string',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      description: 'Time for the testimonial',
      type: 'locale_string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      description: 'Country for the testimonial',
      type: 'locale_string',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      description: 'Avatar for the testimonial',
      type: 'image',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      description: 'Rating for the testimonial (out of 5)',
      type: 'number',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title for the testimonial',
      type: 'locale_string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      description: 'Text for the testimonial',
      type: 'locale_string',
    }),
  ],
  preview: {
    select: {
      name: 'name.en',
      rating: 'rating',
    },
    prepare: ({ name, rating }) => ({
      title: 'Testimonial',
      subtitle: joinStrings('|', name, displayNumber(rating, 'Star')),
    }),
  },
})
