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
			'Jérémy Amand - Cloud Engineer building Kubernetes infrastructure for a European sovereign cloud. Blog posts, projects, and learnings from cloud native development.',
		'meta.about':
			'Cloud Engineer with a bioinformatics background, building Kubernetes infrastructure for European digital sovereignty. Based in Germany, from Luxemburg. European.',
		'meta.blog':
			'Articles on cloud native development, Kubernetes, digital sovereignty, and lessons learned.',
		'meta.tags': 'Browse blog posts by topic and category.',
		'meta.imprint': 'Legal information and contact details.',

		// Home page
		'home.greeting': "👋 Hi, I'm Jérémy.",
		'home.tagline': 'Software Developer & Cloud Enthusiast',
		'home.intro':
			'Cloud Engineer building Kubernetes for a European sovereign cloud. Coming from a bioinformatics background, I share what I learn about cloud native development and my journey towards more open source adoption.',
		'home.aboutMe': 'About me',
		'home.projects': 'Projects',
		'home.recentPosts': 'Recent Posts',
		'home.viewAllPosts': 'View all posts',
		'home.noPosts': 'No posts yet — stay tuned!',
		'home.techStack': 'Tech Stack',
		'home.techStack.languages': 'Languages',
		'home.techStack.infrastructure': 'Infrastructure & Tools',
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
			'Jérémy Amand - Cloud Engineer, der an Kubernetes für eine souveräne europäische Cloud arbeitet. Blog, Projekte und Lektionen über Cloud-native Entwicklung.',
		'meta.about':
			'Cloud Engineer mit einem Bioinformatik-Hintergrund, baut Kubernetes für europäische digitale Souveränität. Wohnt ihn Deutschland, aus Luxemburg. Europäer.',
		'meta.blog':
			'Artikel über Cloud-native Entwicklung, Kubernetes, digitale Souveränität und Lektionen auf dem Weg dahin.',

		'meta.tags': 'Blogbeiträge nach Thema und Kategorie durchsuchen.',
		'meta.imprint': 'Rechtliche Informationen und Kontaktdaten.',

		// Home page
		'home.greeting': '👋 Hallo, ich bin Jérémy.',
		'home.tagline': 'Softwareentwickler & Cloud-Enthusiast',
		'home.intro':
			'Cloud Engineer mit Fokus auf Kubernetes für eine europäische souveräne Cloud. Mit meinem Hintergrund in Bioinformatik teile ich hier, was ich über Cloud-native Entwicklung lerne und über meinen Weg zu mehr Open Source-Beteiligung.',

		'home.aboutMe': 'Über mich',
		'home.projects': 'Projekte',
		'home.recentPosts': 'Neueste Beiträge',
		'home.viewAllPosts': 'Alle Beiträge ansehen',
		'home.noPosts': 'Noch keine Beiträge — bald mehr!',
		'home.techStack': 'Technologien',
		'home.techStack.languages': 'Sprachen',
		'home.techStack.infrastructure': 'Infrastruktur & Tools',
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
