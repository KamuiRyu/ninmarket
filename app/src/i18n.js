import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importe as traduções de acordo com o idioma
import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';

// Configuração do i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      pt: {
        translation: translationPT,
      },
    },
    lng: localStorage.getItem("auth_language") || "en", 
    fallbackLng: localStorage.getItem("auth_language") || "en", 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;