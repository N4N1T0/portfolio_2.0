import type { UI } from '@/types'
import { defaultLang, ui } from './ui'

export function useTranslations(lang: 'en' | 'es') {
  return function t(key: keyof UI[typeof lang]) {
    return (
      (ui[lang] as UI[typeof lang])[key] ||
      (ui[defaultLang] as UI[typeof lang])[key]
    )
  }
}

export function getLangFromLocale(lang: string | undefined): 'es' | 'en' {
  return lang === 'es' || lang === 'en' ? lang : defaultLang
}

export function changeLangFromUrl(url: URL, lang: string) {
  const newLang = lang === 'es' ? 'en' : 'es'
  const splitUrl = url.pathname.split('/')
  splitUrl[1] = newLang
  return splitUrl.join('/').substring(1)
}
