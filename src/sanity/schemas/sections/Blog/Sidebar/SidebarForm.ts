import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { CursorText } from '@phosphor-icons/react'

export default defineType({
  name: 'sidebar_form',
  title: 'Sidebar Form',
  icon: CursorText,
  description: 'Sidebar Form Section for the blog',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'The tagline for the sidebar search section',
      type: 'locale_string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The heading for the sidebar search section',
      type: 'locale_string',
    }),
    defineField({
      name: 'form_input_fields',
      title: 'Form Input Fields',
      description: 'The form input fields for the sidebar search section',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'form_input_field',
          title: 'Form Input Field',
          description: 'A form input field',
          type: 'form_input_field',
        }),
        defineArrayMember({
          name: 'form_button',
          title: 'Form Button',
          description: 'A form button',
          type: 'form_button',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      form_input_fields: 'form_input_fields',
    },
    prepare: ({ title, form_input_fields }) => ({
      title: 'Sidebar Form',
      subtitle: joinStrings('|', title.en, displayNumber(form_input_fields?.length, 'input field')),
    }),
  },
})
