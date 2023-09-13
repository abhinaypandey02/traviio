import { defineArrayMember, defineField, defineType } from 'sanity'

import { displayNumber, joinStrings } from '@/utils/utils'
import { Globe, Link, ListBullets, MapPin } from '@phosphor-icons/react'

export default defineType({
  name: 'globals',
  title: 'Globals',
  type: 'document',
  icon: Globe as any,
  groups: [
    { name: 'navbar', title: 'Navbar' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'navbar',
      title: 'Navbar',
      type: 'object',
      group: 'navbar',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          description: 'The logo for the navbar',
          type: 'image',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          description: 'Links for the navbar',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'link',
              title: 'Link',
              icon: Link as any,
              type: 'link',
            }),
            defineArrayMember({
              name: 'dropdown',
              title: 'Dropdown',
              icon: ListBullets as any,
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  description: 'Title for the dropdown',
                  type: 'locale_string',
                }),
                defineField({
                  name: 'links',
                  title: 'Links',
                  description: 'Links for the dropdown',
                  type: 'array',
                  of: [defineArrayMember({ type: 'link' })],
                }),
              ],
              preview: {
                select: {
                  title: 'title.en',
                  links: 'links',
                },
                prepare({ title, links }) {
                  return {
                    title: `Dropdown`,
                    subtitle: joinStrings('|', title, displayNumber(links?.length, 'Link')),
                  }
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          description: 'CTA for the navbar',
          type: 'link_button',
        }),
      ],
      preview: {
        select: {
          title: 'title.en',
          links: 'links',
          cta: 'cta.title.en',
        },
        prepare: ({ title, links, cta }) => ({
          title: `Navbar`,
          subtitle: joinStrings('|', title, displayNumber(links?.length, 'Link'), cta),
        }),
      },
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          description: 'The logo for the footer',
          type: 'image',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          description: 'Title for the footer',
          type: 'locale_string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          description: 'Description for the footer',
          type: 'locale_text',
        }),
        defineField({
          name: 'link_groups',
          title: 'Link Groups',
          description: 'Link groups for the footer',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'link_group',
              title: 'Link Group',
              icon: ListBullets as any,
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  description: 'Title for the link group',
                  type: 'locale_string',
                }),
                defineField({
                  name: 'links',
                  title: 'Links',
                  description: 'Links for the link group',
                  type: 'array',
                  of: [defineArrayMember({ icon: Link as any, type: 'link' })],
                }),
              ],
              preview: {
                select: {
                  title: 'title.en',
                  links: 'links',
                },
                prepare({ title, links }) {
                  return {
                    title: `Link Group`,
                    subtitle: joinStrings('|', title, displayNumber(links?.length, 'Link')),
                  }
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'locations',
          title: 'Locations',
          description: 'Locations for the footer',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              description: 'Title for the locations',
              type: 'locale_string',
            }),
            defineField({
              name: 'locations',
              title: 'Locations',
              description: 'Locations for the locations',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'location',
                  title: 'Location',
                  icon: MapPin as any,
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      description: 'Title for the location',
                      type: 'locale_string',
                    }),
                    defineField({
                      name: 'address',
                      title: 'Address',
                      description: 'Address for the location',
                      type: 'locale_string',
                    }),
                    defineField({
                      name: 'phone_number',
                      title: 'Phone Number',
                      type: 'locale_string',
                    }),
                    defineField({
                      name: 'email',
                      title: 'Email',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title.en',
                      address: 'address.en',
                      phone_number: 'phone_number.en',
                      email: 'email',
                    },
                    prepare({ title, address, phone_number, email }) {
                      return {
                        title: `Location`,
                        subtitle: joinStrings('|', title, address, phone_number, email),
                      }
                    },
                  },
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'copyright_text',
          title: 'Copyright',
          description: 'Copyright text for the footer',
          type: 'locale_text',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Globals',
    }),
  },
})
