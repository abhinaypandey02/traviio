import { defineType } from 'sanity'

import Locales from '.'

export const locale_rich_text = defineType({
  name: 'locale_rich_text',
  title: 'Localized Rich Text',
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
      type: 'rich_text',
    },
    ...Locales.supportedLanguages.map((lang) => ({
      title: lang.title,
      name: lang.id,
      type: 'rich_text',
      fieldset: 'translations',
    })),
  ],
  preview: {
    select: {
      title: Locales.defaultLanguage.id,
    },
  },
})
