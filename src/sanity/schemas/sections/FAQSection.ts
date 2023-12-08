import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Question } from '@phosphor-icons/react'

export const faq_section = defineType({
  name: 'faq_section',
  title: 'FAQ Section',
  type: 'object',
  icon: Question as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      description: 'Title for the FAQ section',
      type: 'locale_string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Tagline for the FAQ section',
      type: 'locale_string',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      description: 'FAQs for the FAQ section',
      type: 'array',
      of: [defineArrayMember({ type: 'faq' })],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      faqs: 'faqs',
    },
    prepare: ({ title, faqs }) => {
      return {
        title: `FAQ Section`,
        subtitle: joinStrings('|', title, displayNumber(faqs?.length, 'FAQ')),
      }
    },
  },
})

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      description: 'Question for the FAQ',
      type: 'locale_string',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      description: 'Answer for the FAQ',
      type: 'locale_text',
    }),
  ],
  preview: {
    select: {
      question: 'question.en',
    },
    prepare({ question }) {
      return {
        title: `FAQ: ${question}`,
      }
    },
  },
})
