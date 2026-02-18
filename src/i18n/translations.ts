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
		'meta.imprint': 'Legal information and contact details.',

		// Home page
		'home.greeting': "👋 Hi, I'm Jérémy.",
		'home.tagline': 'Software Developer & Cloud Enthusiast',
		'home.intro':
			'I build cloud native software, all things Kubernetes, and digital sovereignty. Bioinformatics background. Welcome to my corner of the web where I share projects, ideas, and things I learn along the way.',
		'home.aboutMe': 'About me',
		'home.projects': 'Projects',
		'home.recentPosts': 'Recent Posts',
		'home.viewAllPosts': 'View all posts',
		'home.noPosts': 'No posts yet — stay tuned!',
		'home.techStack': 'Tech Stack',
		'home.techStack.languages': 'Languages',
		'home.techStack.infrastructure': 'Infrastructure',
		'home.techStack.tools': 'Tools',
		'home.techStack.certifications': 'Certifications',

		// About page
		'about.experience': 'Experience',
		'about.education': 'Education',

		// Blog
		'blog.title': 'Blog',
		'blog.publishedOn': 'Published',
		'blog.updatedAt': 'Updated',
		'blog.author': 'Author',
		'blog.availableIn': 'Translation',
		'blog.postsTaggedWith': 'Posts tagged with',
		'blog.tags': 'Tags',
		'blog.noTags': 'No tags available yet.',
		'blog.articleCount': '{count} articles',
		'blog.articleCountSingular': '1 article',
		'blog.latestPost': 'Latest post: ',
		'blog.minRead': '{min} min read',
		'blog.copyLink': 'Copy link',
		'blog.share': 'Share',
		'blog.previousPost': 'Previous',
		'blog.nextPost': 'Next',

		// Projects
		'project.viewOnGitHub': 'View on GitHub',
		'project.status.active': 'Active',
		'project.status.completed': 'Completed',
		'project.status.on-hold': 'On Hold',
		'project.status.planned': 'Planned',

		// Image
		'image.photoBy': 'Photo by',

		// 404
		'404.title': '404 - Page Not Found',
		'404.message': "The page you're looking for doesn't exist.",

		// Language switcher
		'lang.switch': 'Switch language',
		'lang.en': '🇬🇧 English',
		'lang.de': '🇩🇪 Deutsch',
		'lang.name.en': 'English',
		'lang.name.de': 'German',

		// Fallback notice
		'fallback.notice': 'This content is not yet available in {lang}.',
		'fallback.viewingIn': 'You are viewing the {lang} version.',

		// Theme toggle
		'theme.auto': 'Theme: auto (switch to light)',
		'theme.light': 'Theme: light (switch to dark)',
		'theme.dark': 'Theme: dark (switch to auto)',

		// Imprint (legal requirement)
		'imprint.title': 'Imprint',
		'imprint.responsible': 'Responsible for content',
		'imprint.contact': 'Contact',
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
		'meta.imprint': 'Rechtliche Informationen und Kontaktdaten.',

		// Home page
		'home.greeting': '👋 Hallo, ich bin Jérémy.',
		'home.tagline': 'Softwareentwickler & Cloud-Enthusiast',
		'home.intro':
			'Ich entwickle Cloud-native Software, alles rund um Kubernetes und digitaler Souveränität. Hintergrund in Bioinformatik. Willkommen auf meiner Webseite, auf der ich Projekte, Ideen und Gelerntes teile.',
		'home.aboutMe': 'Über mich',
		'home.projects': 'Projekte',
		'home.recentPosts': 'Neueste Beiträge',
		'home.viewAllPosts': 'Alle Beiträge ansehen',
		'home.noPosts': 'Noch keine Beiträge — bald mehr!',
		'home.techStack': 'Technologien',
		'home.techStack.languages': 'Sprachen',
		'home.techStack.infrastructure': 'Infrastruktur',
		'home.techStack.tools': 'Tools',
		'home.techStack.certifications': 'Zertifizierungen',

		// About page
		'about.experience': 'Berufserfahrung',
		'about.education': 'Ausbildung',

		// Blog
		'blog.title': 'Blog',
		'blog.publishedOn': 'Veröffentlicht',
		'blog.updatedAt': 'Aktualisiert',
		'blog.author': 'Autor',
		'blog.availableIn': 'Übersetzung',
		'blog.postsTaggedWith': 'Beiträge mit Tag',
		'blog.tags': 'Tags',
		'blog.noTags': 'Noch keine Tags verfügbar.',
		'blog.articleCount': '{count} Artikel',
		'blog.articleCountSingular': '1 Artikel',
		'blog.latestPost': 'Neuester Beitrag: ',
		'blog.minRead': '{min} Min.',
		'blog.copyLink': 'Link kopieren',
		'blog.share': 'Teilen',
		'blog.previousPost': 'Zurück',
		'blog.nextPost': 'Weiter',

		// Projects
		'project.viewOnGitHub': 'Auf GitHub ansehen',
		'project.status.active': 'Aktiv',
		'project.status.completed': 'Abgeschlossen',
		'project.status.on-hold': 'Pausiert',
		'project.status.planned': 'Geplant',

		// Image
		'image.photoBy': 'Foto von',

		// 404
		'404.title': '404 - Seite nicht gefunden',
		'404.message': 'Die gesuchte Seite existiert nicht.',

		// Language switcher
		'lang.switch': 'Sprache wechseln',
		'lang.en': '🇬🇧 English',
		'lang.de': '🇩🇪 Deutsch',
		'lang.name.en': 'Englisch',
		'lang.name.de': 'Deutsch',

		// Fallback notice
		'fallback.notice': 'Dieser Inhalt ist noch nicht auf {lang} verfügbar.',
		'fallback.viewingIn': 'Sie sehen die Version auf {lang}.',

		// Theme toggle
		'theme.auto': 'Design: automatisch (zu hell wechseln)',
		'theme.light': 'Design: hell (zu dunkel wechseln)',
		'theme.dark': 'Design: dunkel (zu automatisch wechseln)',

		// Imprint (legal requirement)
		'imprint.title': 'Impressum',
		'imprint.responsible': 'Verantwortlich für den Inhalt',
		'imprint.contact': 'Kontakt',
	},
} as const;

export type TranslationKey = keyof (typeof translations)['en'];
