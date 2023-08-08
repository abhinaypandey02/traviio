export type SupportedLanguage = {
  id: 'en' | 'id'
  title: string
}

const defaultLanguage: SupportedLanguage = {
  id: 'en',
  title: 'English',
}

const supportedLanguages: SupportedLanguage[] = [{ id: 'id', title: 'Bahasa Indonesia' }]

const Locales = {
  defaultLanguage,
  supportedLanguages,
}

export default Locales
