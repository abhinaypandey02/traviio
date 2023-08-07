import { defineType } from 'sanity'

export type SupportedLanguage = {
  id: 'en' | 'id'
  title: string
}

export const defaultLanguage: SupportedLanguage = {
  id: 'en',
  title: 'English',
}

export const supportedLanguages: SupportedLanguage[] = [{ id: 'id', title: 'Bahasa Indonesia' }]

export default defineType({
  name: 'locale_string',
  title: 'Localized String',
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
      name: defaultLanguage.id,
      title: defaultLanguage.title,
      type: 'string',
    },
    ...supportedLanguages.map((lang) => ({
      title: lang.title,
      name: lang.id,
      type: 'string',
      fieldset: 'translations',
    })),
  ],
  preview: {
    select: {
      title: defaultLanguage.id,
    },
  },
})
