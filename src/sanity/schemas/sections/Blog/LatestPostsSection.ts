import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { EnvelopeOpen } from '@phosphor-icons/react'

export default defineType({
  name: 'latest_posts_section',
  title: 'Latest Posts Section',
  icon: EnvelopeOpen as any,
  description: 'Latest Posts Section for the blog',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'The tagline for the latest posts section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The heading for the latest posts section',
      type: 'locale_string',
    }),
    defineField({
      name: 'filter_tags',
      title: 'Filter tags',
      description: 'The filter tags for the latest posts section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'filter_tag',
          title: 'Filter tag',
          description: 'A filter tag',
          type: 'reference',
          to: [{ type: 'tag' }],
        }),
      ],
    }),
    defineField({
      name: 'sorting_methods',
      title: 'Sorting methods',
      description: 'The sorting methods for the latest posts section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sorting_strategies',
          title: 'Sorting method',
          description: 'A sorting method',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'sorting_strategy',
              title: 'Sorting strategy',
              description: 'A sorting strategy',
              type: 'string',
              options: {
                list: [
                  { value: 'recent', title: 'Most recent' },
                  { value: 'popular', title: 'Most popular' },
                  { value: 'featured', title: 'Featured' },
                ],
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'multiple_rows',
      title: 'Has multiple rows?',
      description: 'Whether the section has multiple rows',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tagline: 'tagline',
      filter_tags: 'filter_tags',
      sorting_methods: 'sorting_methods',
    },
    prepare: ({ title, tagline, filter_tags, sorting_methods }) => {
      return {
        title: 'Latest Posts Section',
        subtitle: joinStrings(
          '|',
          title,
          displayNumber(filter_tags?.length, 'tag'),
          displayNumber(sorting_methods?.length, 'sorting method')
        ),
      }
    },
  },
})
