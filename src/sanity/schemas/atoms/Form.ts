import { defineField, defineType } from 'sanity'

export const form_input_field = defineType({
  name: 'form_input_field',
  title: 'Form Input Field',
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
  type: 'object',
  fields: [
    defineField({
      name: 'is_icon',
      title: 'Is Icon',
      description: 'Is the button only an icon?',
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
