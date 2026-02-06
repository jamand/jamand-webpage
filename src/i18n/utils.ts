import {
	translations,
	defaultLang,
	supportedLangs,
	langMeta,
	localeMap,
	type Lang,
	type TranslationKey,
} from './translations';

/**
 * Get the current language from the URL
 */
export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (supportedLangs.includes(lang as Lang)) {
		return lang as Lang;
	}
	return defaultLang;
}

/**
 * Get a translation for a specific key
 */
export function t(lang: Lang, key: TranslationKey): string {
	return translations[lang][key] ?? translations[defaultLang][key] ?? key;
}

/**
 * Create a translation function bound to a specific language
 */
export function useTranslations(lang: Lang) {
	return (key: TranslationKey) => t(lang, key);
}

/**
 * Get the localized path for a given path
 */
export function getLocalizedPath(path: string, lang: Lang): string {
	// Remove leading slash for processing
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;

	// Remove any existing locale prefix
	const pathWithoutLocale = supportedLangs.some((l) =>
		cleanPath.startsWith(`${l}/`),
	)
		? cleanPath.split('/').slice(1).join('/')
		: cleanPath;

	// Add locale prefix for non-default language
	if (lang === defaultLang) {
		return `/${pathWithoutLocale}`;
	}
	return `/${lang}/${pathWithoutLocale}`;
}

/**
 * Get the alternate language URL for language switcher
 */
export function getAlternateLocaleUrl(
	currentUrl: URL,
	targetLang: Lang,
): string {
	const currentPath = currentUrl.pathname;
	return getLocalizedPath(currentPath, targetLang);
}

/**
 * Get the date locale string for Intl.DateTimeFormat based on language
 */
export function getDateLocale(lang: Lang): string {
	return localeMap[lang] || localeMap[defaultLang];
}

/**
 * Get the flag emoji for a language
 */
export function getLangFlag(lang: Lang): string {
	return langMeta[lang]?.flag || langMeta[defaultLang].flag;
}

/**
 * Get the native name for a language (e.g., "Deutsch" for German)
 */
export function getLangName(lang: Lang): string {
	return langMeta[lang]?.name || langMeta[defaultLang].name;
}
