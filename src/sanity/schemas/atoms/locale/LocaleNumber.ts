import { defineType } from 'sanity'

import Locales from '.'

export default defineType({
  name: 'locale_number',
  title: 'Localized Number',
  type: 'object',
  options: {
    collapsible: true,
  },
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: Locales.defaultLanguage.id,
      title: Locales.defaultLanguage.title,
      type: 'number',
    },
    ...Locales.supportedLanguages.map((lang) => ({
      title: lang.title,
      name: lang.id,
      type: 'number',
      fieldset: 'translations',
    })),
  ],
  preview: {
    select: {
      title: Locales.defaultLanguage.id,
    },
  },
})
