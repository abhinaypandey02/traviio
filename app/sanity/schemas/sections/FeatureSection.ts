import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/lib/utils/utils'
import { RocketLaunch } from '@phosphor-icons/react'

export const feature_section = defineType({
  name: 'feature_section',
  title: 'Feature Section',
  description: 'Features section with a title and a list of features',
  icon: RocketLaunch,
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      description: 'Type of the feature section',
      type: 'string',
      options: {
        list: [
          { title: 'small', value: 'small' },
          { title: 'large', value: 'large' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the feature section',
      type: 'locale_string',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      description: 'Features for the feature section',
      type: 'array',
      of: [defineArrayMember({ type: 'feature' })],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      features: 'features',
    },
    prepare: ({ title, features }) => {
      return {
        title: `Feature Section`,
        subtitle: `${joinStrings('|', title, displayNumber(features?.length, 'feature'))}`,
      }
    },
  },
})

export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title for the feature',
      type: 'locale_string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Description for the feature (used for long feature sections)',
      type: 'locale_string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'Icon for the feature',
      type: 'icon',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'description.en',
      media: 'icon',
    },
    prepare: ({ title, subtitle, media }) => {
      return {
        title: 'Feature',
        subtitle: `${joinStrings('|', title, subtitle)}`,
        media,
      }
    },
  },
})
