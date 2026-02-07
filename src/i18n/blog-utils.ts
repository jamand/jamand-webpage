import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './translations';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Get all posts for a specific language
 */
export async function getPostsByLang(lang: Lang): Promise<BlogPost[]> {
	const allPosts = await getCollection('blog');
	return allPosts
		.filter((post) => post.data.lang === lang)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Get a post and its translation (if available)
 */
export async function getPostWithTranslation(post: BlogPost): Promise<{
	post: BlogPost;
	translation?: BlogPost;
}> {
	const allPosts = await getCollection('blog');
	// Find a post with the same postId but different language
	const translation = allPosts.find(
		(p) => p.data.postId === post.data.postId && p.data.lang !== post.data.lang,
	);

	return { post, translation };
}

/**
 * Check if a post has a translation available
 */
export async function hasTranslation(post: BlogPost): Promise<boolean> {
	const allPosts = await getCollection('blog');
	return allPosts.some(
		(p) => p.data.postId === post.data.postId && p.data.lang !== post.data.lang,
	);
}

export type AvailableLanguage = {
	lang: Lang;
	url: string;
};

/**
 * Get all posts with available language versions
 */
export async function getPostsWithLanguages(lang: Lang): Promise<
	Array<{
		post: BlogPost;
		availableLanguages: AvailableLanguage[];
	}>
> {
	const posts = await getPostsByLang(lang);
	const allPosts = await getCollection('blog');

	return posts.map((post) => {
		const availableLanguages: AvailableLanguage[] = [
			{ lang: post.data.lang as Lang, url: getPostUrl(post) },
		];

		// Find all translations with the same postId but different language
		const translations = allPosts.filter(
			(p) =>
				p.data.postId === post.data.postId && p.data.lang !== post.data.lang,
		);

		translations.forEach((translation) => {
			availableLanguages.push({
				lang: translation.data.lang as Lang,
				url: getPostUrl(translation),
			});
		});

		return { post, availableLanguages };
	});
}

/**
 * Get available languages for a single post
 */
export async function getAvailableLanguages(
	post: BlogPost,
): Promise<AvailableLanguage[]> {
	const languages: AvailableLanguage[] = [
		{ lang: post.data.lang as Lang, url: getPostUrl(post) },
	];

	const allPosts = await getCollection('blog');
	// Find all translations with the same postId but different language
	const translations = allPosts.filter(
		(p) => p.data.postId === post.data.postId && p.data.lang !== post.data.lang,
	);

	translations.forEach((translation) => {
		languages.push({
			lang: translation.data.lang as Lang,
			url: getPostUrl(translation),
		});
	});

	return languages;
}

/**
 * Get the URL for a blog post based on language
 */
export function getPostUrl(post: BlogPost): string {
	const lang = post.data.lang;
	const slug = post.data.slug;

	if (lang === defaultLang) {
		return `/posts/${slug}/`;
	}
	return `/${lang}/posts/${slug}/`;
}
