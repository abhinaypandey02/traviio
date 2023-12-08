import { defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'

export default defineType({
  name: 'tour_timeline',
  title: 'Tour Timeline',
  type: 'object',
  fields: [
    defineField({
      name: 'start_day',
      title: 'Start Day',
      description: 'Start Day',
      type: 'string',
      options: {
        list: [
          { title: 'Sunday', value: 'sun' },
          { title: 'Monday', value: 'mon' },
          { title: 'Tuesday', value: 'tue' },
          { title: 'Wednesday', value: 'wed' },
          { title: 'Thursday', value: 'thu' },
          { title: 'Friday', value: 'fri' },
          { title: 'Saturday', value: 'sat' },
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      description: 'Duration of the tour in days',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      start_day: 'start_day',
      duration: 'duration',
    },
    prepare: ({ start_day, duration }) => ({
      title: 'Timeline',
      subtitle: joinStrings('|', start_day, displayNumber(duration, 'day')),
    }),
  },
})
