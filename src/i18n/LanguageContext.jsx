import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ta } from './ta.js';

const STORAGE_KEY = 'madhava-lang';
const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (k, fallback) => fallback });

function initialLang() {
  if (typeof window === 'undefined') return 'en';
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'ta' || q === 'en') return q;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'ta' || saved === 'en') return saved;
  } catch (e) {
    /* storage unavailable */
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  // Always render English first so the prerendered HTML and the first client
  // render match; switch to the saved language right after mount.
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    setLangState(initialLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const t = useCallback((key, fallback) => (lang === 'ta' && ta[key] ? ta[key] : fallback), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
export const useT = () => useContext(LanguageContext).t;

// Returns a service with its title/description translated (when Tamil is on).
export const localizeService = (s, t) => ({
  ...s,
  title: t(`svc.${s.id}.title`, s.title),
  description: t(`svc.${s.id}.desc`, s.description),
});
