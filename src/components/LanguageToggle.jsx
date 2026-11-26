import React from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';

// English / தமிழ் switch. The whole site re-renders in the chosen language and
// the choice is remembered on this device.
export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === 'en' ? 'is-on' : ''}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === 'ta' ? 'is-on' : ''}
        aria-pressed={lang === 'ta'}
        onClick={() => setLang('ta')}
        lang="ta"
      >
        தமிழ்
      </button>
    </div>
  );
}
