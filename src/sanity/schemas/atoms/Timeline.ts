import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'

export default defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'object',
  fields: [
    defineField({
      name: 'start_date',
      title: 'Start Date',
      description: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'end_date',
      title: 'End Date',
      description: 'End Date',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      start_date: 'start_date',
      end_date: 'end_date',
    },
    prepare: ({ start_date, end_date }) => ({
      title: 'Timeline',
      subtitle: joinStrings('|', start_date, end_date),
    }),
  },
})
