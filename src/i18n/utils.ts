import type { UI } from '@/types'
import { defaultLang, ui } from './ui'

/**
 * Creates a translation function for the specified language.
 * Falls back to the default language if the key is missing.
 * @param lang - Target language code ('en' | 'es')
 * @returns Translation function that accepts a UI key
 */
export function useTranslations(lang: 'en' | 'es') {
  return function t(key: keyof UI[typeof lang]) {
    return (
      (ui[lang] as UI[typeof lang])[key] ||
      (ui[defaultLang] as UI[typeof lang])[key]
    )
  }
}

/**
 * Normalizes an incoming locale string to a supported language code.
 * @param lang - Raw locale string (may be undefined)
 * @returns Valid language code ('es' | 'en'), defaults to `defaultLang`
 */
export function getLangFromLocale(lang: string | undefined): 'es' | 'en' {
  return lang === 'es' || lang === 'en' ? lang : defaultLang
}

/**
 * Switches the language segment in a URL and optionally replaces the slug
 * with its counterpart ID.
 * @param url - Original URL object to transform
 * @param lang - Current language code
 * @param counterpartId - Optional counterpart slug to insert (format: "/{lang}/{slug}")
 * @returns Updated URL string with new language and optional slug
 */
export function changeLangFromUrl(
  url: URL,
  lang: string,
  counterpartId?: string | undefined
) {
  const newLang = lang === 'es' ? 'en' : 'es'
  const splitUrl = url.pathname.split('/')
  splitUrl[1] = newLang
  if (counterpartId) {
    splitUrl[3] = counterpartId.split('/').filter(Boolean)[1]
  }
  url.pathname = splitUrl.join('/')
  return url.toString()
}
