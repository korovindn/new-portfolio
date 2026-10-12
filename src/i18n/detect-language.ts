export const supportedLanguages = ["en", "ru"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = "en";

const supportedLanguageSet = new Set<string>(supportedLanguages);

const isSupportedLanguage = (language: string): language is SupportedLanguage =>
  supportedLanguageSet.has(language);

const primaryLanguage = (locale: string) => locale.toLowerCase().split("-")[0];

export const matchSupportedLanguage = (
  locales: readonly string[],
): SupportedLanguage => {
  for (const locale of locales) {
    const language = primaryLanguage(locale);
    if (language && isSupportedLanguage(language)) return language;
  }

  return defaultLanguage;
};

export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof navigator === "undefined") return defaultLanguage;

  const locales =
    navigator.languages.length > 0 ? navigator.languages : [navigator.language];

  return matchSupportedLanguage(locales);
};
