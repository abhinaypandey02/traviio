import { defineField, defineType } from 'sanity'

import { HandPointing, Textbox } from '@phosphor-icons/react'

export const form_input_field = defineType({
  name: 'form_input_field',
  title: 'Form Input Field',
  icon: Textbox as any,
  description: 'Form input field',
  type: 'object',
  fields: [
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      description: 'Placeholder for the form input field',
      type: 'locale_string',
    }),
    defineField({
      name: 'submit_button',
      title: 'Submit Button',
      description: 'Submit button for the form input field',
      type: 'form_button',
    }),
  ],
})

export const form_button = defineType({
  name: 'form_button',
  title: 'Form Button',
  icon: HandPointing as any,
  description: 'Form button',
  type: 'object',
  fields: [
    defineField({
      name: 'is_icon',
      title: 'Is Icon',
      description: 'Is the button only an icon?',
      type: 'boolean',
    }),
    defineField({
      name: 'is_inline',
      title: 'Is inline?',
      description: 'Is the button inline?',
      type: 'boolean',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Label for the form button',
      type: 'locale_string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'Icon for the form button',
      type: 'icon',
    }),
  ],
})
