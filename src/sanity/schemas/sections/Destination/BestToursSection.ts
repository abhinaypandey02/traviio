import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { SuitcaseRolling , Link } from '@phosphor-icons/react'

export default defineType({
  name: 'best_tours_section',
  title: 'Best Tours Section',
  icon: SuitcaseRolling as any,
  type: 'object',
  fields: [
    defineField({
        name: 'title',
        title: 'Title',
        type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'title.en',
      facts: 'facts',
      links: 'useful_links_section.useful_links',
    },
    prepare: ({ title, facts, links }) => ({
      title: 'Best Tours Section',
      subtitle: joinStrings(
        '|',
        title,
        displayNumber(facts?.length, 'fact'),
        displayNumber(links?.length, 'link')
      ),
    }),
  },
})
