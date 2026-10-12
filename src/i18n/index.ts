import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "../locales/en";
import { ru } from "../locales/ru";
import {
  defaultLanguage,
  detectBrowserLanguage,
  supportedLanguages,
} from "./detect-language";

const language = detectBrowserLanguage();

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: language,
  fallbackLng: defaultLanguage,
  supportedLngs: [...supportedLanguages],
  nonExplicitSupportedLngs: true,
  load: "languageOnly",
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

i18n.on("languageChanged", (nextLanguage) => {
  document.documentElement.lang = nextLanguage;
});

document.documentElement.lang = language;

export { defaultLanguage, supportedLanguages };

export default i18n;
