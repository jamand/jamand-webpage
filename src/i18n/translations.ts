export const defaultLang = 'en' as const;
export const supportedLangs = ['en', 'de'] as const;
export type Lang = (typeof supportedLangs)[number];

// Language metadata (flag emoji and native name)
export const langMeta: Record<Lang, { flag: string; name: string }> = {
	en: { flag: '🇬🇧', name: 'English' },
	de: { flag: '🇩🇪', name: 'Deutsch' },
};

// Full locale codes for date formatting and sitemap
export const localeMap: Record<Lang, string> = {
	en: 'en-GB',
	de: 'de-DE',
};

export const translations = {
	en: {
		// Navigation
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.blog': 'Blog',

		// Common UI
		'common.readMore': 'Read more',
		'common.backToHome': 'Go back home',
		'common.browseByTags': 'Browse by tags',
		'common.skipToContent': 'Skip to main content',

		// Meta descriptions
		'meta.home':
			'Personal website of Jérémy Amand - software developer sharing thoughts and projects.',
		'meta.about':
			'Learn more about Jérémy Amand, his background, and interests.',
		'meta.blog':
			'Articles and thoughts on software development and technology.',
		'meta.tags': 'Browse blog posts by topic and category.',

		// Blog
		'blog.title': 'Blog',
		'blog.publishedOn': 'Published',
		'blog.author': 'Author',
		'blog.availableIn': 'Translation',
		'blog.postsTaggedWith': 'Posts tagged with',
		'blog.tags': 'Tags',

		// 404
		'404.title': '404 - Page Not Found',
		'404.message': "The page you're looking for doesn't exist.",

		// Language switcher
		'lang.switch': 'Switch language',
		'lang.en': '🇬🇧 English',
		'lang.de': '🇩🇪 Deutsch',
	},
	de: {
		// Navigation
		'nav.home': 'Startseite',
		'nav.about': 'Über mich',
		'nav.blog': 'Blog',

		// Common UI
		'common.readMore': 'Weiterlesen',
		'common.backToHome': 'Zurück zur Startseite',
		'common.browseByTags': 'Nach Tags durchsuchen',
		'common.skipToContent': 'Zum Hauptinhalt springen',

		// Meta descriptions
		'meta.home':
			'Persönliche Webseite von Jérémy Amand - Softwareentwickler mit Gedanken und Projekten.',
		'meta.about':
			'Erfahren Sie mehr über Jérémy Amand, seinen Hintergrund und seine Interessen.',
		'meta.blog': 'Artikel und Gedanken zu Softwareentwicklung und Technologie.',
		'meta.tags': 'Blogbeiträge nach Thema und Kategorie durchsuchen.',

		// Blog
		'blog.title': 'Blog',
		'blog.publishedOn': 'Veröffentlicht',
		'blog.author': 'Autor',
		'blog.availableIn': 'Übersetzung',
		'blog.postsTaggedWith': 'Beiträge mit Tag',
		'blog.tags': 'Tags',

		// 404
		'404.title': '404 - Seite nicht gefunden',
		'404.message': 'Die gesuchte Seite existiert nicht.',

		// Language switcher
		'lang.switch': 'Sprache wechseln',
		'lang.en': '🇬🇧 English',
		'lang.de': '🇩🇪 Deutsch',
	},
} as const;

export type TranslationKey = keyof (typeof translations)['en'];
