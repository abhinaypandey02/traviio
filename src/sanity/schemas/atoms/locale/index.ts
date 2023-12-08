/*
Instructions to add a new language:
- Add the language to the SupportedLanguage type
- Add the language to the supportedLanguages array
*/

export type SupportedLanguage = {
  id: 'en' | 'es'
  title: string
}

const defaultLanguage: SupportedLanguage = {
  id: 'en',
  title: 'English',
}

const supportedLanguages: SupportedLanguage[] = [{ id: 'es', title: 'Spanish' }]

const Locales = {
  defaultLanguage,
  supportedLanguages,
}

export default Locales
