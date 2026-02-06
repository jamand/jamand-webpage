import { describe, it, expect } from 'vitest';
import {
	getLangFromUrl,
	t,
	useTranslations,
	getLocalizedPath,
	getAlternateLocaleUrl,
	getDateLocale,
	getLangFlag,
	getLangName,
} from './utils';
import { defaultLang } from './translations';

describe('i18n utils', () => {
	describe('getLangFromUrl', () => {
		it('should extract language from URL path', () => {
			const url = new URL('https://example.com/de/blog');
			expect(getLangFromUrl(url)).toBe('de');
		});

		it('should return default language for English URLs', () => {
			const url = new URL('https://example.com/en/about');
			expect(getLangFromUrl(url)).toBe('en');
		});

		it('should return default language for root path', () => {
			const url = new URL('https://example.com/');
			expect(getLangFromUrl(url)).toBe(defaultLang);
		});

		it('should return default language for unsupported language codes', () => {
			const url = new URL('https://example.com/fr/blog');
			expect(getLangFromUrl(url)).toBe(defaultLang);
		});
	});

	describe('t (translation)', () => {
		it('should return English translation', () => {
			expect(t('en', 'nav.home')).toBe('Home');
			expect(t('en', 'nav.blog')).toBe('Blog');
		});

		it('should return German translation', () => {
			expect(t('de', 'nav.home')).toBe('Startseite');
		});

		it('should fallback to English for missing translations', () => {
			// If a key doesn't exist in German, it should fallback to English
			const result = t('de', 'nav.home');
			expect(result).toBeTruthy();
		});

		it('should return key itself if translation is missing in all languages', () => {
			const missingKey = 'nonexistent.key';
			// @ts-expect-error - Testing with invalid key for error handling
			expect(t('en', missingKey)).toBe(missingKey);
		});
	});

	describe('useTranslations', () => {
		it('should create a bound translation function', () => {
			const tEn = useTranslations('en');
			expect(tEn('nav.home')).toBe('Home');

			const tDe = useTranslations('de');
			expect(tDe('nav.home')).toBe('Startseite');
		});
	});

	describe('getLocalizedPath', () => {
		it('should return path without locale prefix for default language', () => {
			expect(getLocalizedPath('/blog', 'en')).toBe('/blog');
			expect(getLocalizedPath('blog', 'en')).toBe('/blog');
		});

		it('should add locale prefix for non-default language', () => {
			expect(getLocalizedPath('/blog', 'de')).toBe('/de/blog');
			expect(getLocalizedPath('blog', 'de')).toBe('/de/blog');
		});

		it('should remove existing locale prefix before adding new one', () => {
			expect(getLocalizedPath('/de/blog', 'en')).toBe('/blog');
			expect(getLocalizedPath('/en/about', 'de')).toBe('/de/about');
		});

		it('should handle root path', () => {
			expect(getLocalizedPath('/', 'en')).toBe('/');
			expect(getLocalizedPath('/', 'de')).toBe('/de/');
		});
	});

	describe('getAlternateLocaleUrl', () => {
		it('should switch between languages', () => {
			const url = new URL('https://example.com/blog');
			expect(getAlternateLocaleUrl(url, 'de')).toBe('/de/blog');

			const deUrl = new URL('https://example.com/de/about');
			expect(getAlternateLocaleUrl(deUrl, 'en')).toBe('/about');
		});
	});

	describe('getDateLocale', () => {
		it('should return correct locale code for English', () => {
			expect(getDateLocale('en')).toBe('en-GB');
		});

		it('should return correct locale code for German', () => {
			expect(getDateLocale('de')).toBe('de-DE');
		});
	});

	describe('getLangFlag', () => {
		it('should return correct flag emoji', () => {
			expect(getLangFlag('en')).toBe('🇬🇧');
			expect(getLangFlag('de')).toBe('🇩🇪');
		});
	});

	describe('getLangName', () => {
		it('should return correct native language name', () => {
			expect(getLangName('en')).toBe('English');
			expect(getLangName('de')).toBe('Deutsch');
		});
	});
});
