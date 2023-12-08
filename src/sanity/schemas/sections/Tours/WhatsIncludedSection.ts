import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'whats_included_section',
  title: 'Whats Included Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'locale_string',
    }),
    defineField({
      name: 'inclusion_list',
      title: 'Inclusion List',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'inclusion_list_item',
          title: 'Inclusion List Item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'icon',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'locale_string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'list_item',
                  title: 'List Item',
                  type: 'locale_string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
