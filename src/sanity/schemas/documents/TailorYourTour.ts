import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'tailor_your_tour',
  title: 'Tailor Your Tour Steps',
  type: 'document',
  fieldsets: [
    {
      name: 'steps',
      title: 'Steps',
    },
  ],
  fields: [
    defineField({
      name: 'step_1',
      title: 'Step 1 | Choose destination',
      type: 'object',
      fieldset: 'steps',
      options: {
        collapsed: true,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'locale_string',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'locale_string',
        }),
        defineField({
          name: 'place_cards',
          title: 'Place Cards',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'place_card',
              title: 'Place Card',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'locale_string',
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'photo',
                }),
                defineField({
                  name: 'is_primary_label',
                  title: 'Primary Label?',
                  description: 'Should the label be colored?',
                  type: 'boolean',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'next_btn',
          title: 'Next Step Button',
          type: 'locale_string',
        }),
        defineField({
          name: 'faq_section',
          title: 'FAQ Section',
          type: 'faq_section',
        }),
      ],
    }),
    defineField({
      name: 'step_2',
      title: 'Step 2 | Calendar',
      type: 'object',
      fieldset: 'steps',
      options: {
        collapsed: true,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'locale_string',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'locale_string',
        }),
        defineField({
          name: 'calendar_section',
          title: 'Calendar Section',
          type: 'object',
          fields: [
            defineField({
              name: 'radio_buttons',
              title: 'Radio Buttons',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'radio_button',
                  title: 'Radio Button',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Text',
                      type: 'locale_string',
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'back_btn',
              title: 'Back Button',
              type: 'locale_string',
            }),
            defineField({
              name: 'next_btn',
              title: 'Next Button',
              type: 'locale_string',
            }),
          ],
        }),
        defineField({
          name: 'faq_section',
          title: 'FAQ Section',
          type: 'faq_section',
        }),
      ],
    }),
    defineField({
      name: 'step_3',
      title: 'Step 3 | Travel Month and Length',
      type: 'object',
      fieldset: 'steps',
      options: {
        collapsed: true,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'locale_string',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'locale_string',
        }),
        defineField({
          name: 'form_section',
          title: 'Form Section',
          type: 'object',
          fields: [
            defineField({
              name: 'radio_buttons',
              title: 'Radio Buttons',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'radio_button',
                  title: 'Radio Button',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Text',
                      type: 'locale_string',
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'back_btn',
              title: 'Back Button',
              type: 'locale_string',
            }),
            defineField({
              name: 'next_btn',
              title: 'Next Button',
              type: 'locale_string',
            }),
          ],
        }),
        defineField({
          name: 'faq_section',
          title: 'FAQ Section',
          type: 'faq_section',
        }),
      ],
    }),
    defineField({
      name: 'step_4',
      title: 'Step 4 | Traveler Details',
      type: 'object',
      fieldset: 'steps',
      options: {
        collapsed: true,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'locale_string',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'locale_string',
        }),
        defineField({
          name: 'form_section',
          title: 'Form Section',
          description: 'A placeholder spot for the Traveler Details form',
          type: 'string',
        }),
        defineField({
          name: 'faq_section',
          title: 'FAQ Section',
          type: 'faq_section',
        }),
      ],
    }),
  ],
})
