import { defineType } from 'sanity'

import Locales from '.'

export default defineType({
  name: 'locale_text',
  title: 'Locale Text',
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
      type: 'text',
    },
    ...Locales.supportedLanguages.map((lang) => ({
      title: lang.title,
      name: lang.id,
      type: 'text',
      fieldset: 'translations',
    })),
  ],
})
