import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './translations';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Get all posts for a specific language
 */
export async function getPostsByLang(lang: Lang): Promise<BlogPost[]> {
	const allPosts = await getCollection('blog');
	return allPosts.filter((post) => post.data.lang === lang);
}

/**
 * Get a post and its translation (if available)
 */
export async function getPostWithTranslation(post: BlogPost): Promise<{
	post: BlogPost;
	translation?: BlogPost;
}> {
	if (!post.data.translationSlug) {
		return { post };
	}

	const allPosts = await getCollection('blog');
	const translation = allPosts.find((p) => p.id === post.data.translationSlug);

	return { post, translation };
}

/**
 * Check if a post has a translation available
 */
export function hasTranslation(post: BlogPost): boolean {
	return !!post.data.translationSlug;
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

		const translationSlug = post.data.translationSlug;
		const translation = translationSlug
			? allPosts.find((p) => p.id === translationSlug)
			: undefined;

		if (translation) {
			availableLanguages.push({
				lang: translation.data.lang as Lang,
				url: getPostUrl(translation),
			});
		}

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

	if (post.data.translationSlug) {
		const allPosts = await getCollection('blog');
		const translation = allPosts.find(
			(p) => p.id === post.data.translationSlug,
		);
		if (translation) {
			languages.push({
				lang: translation.data.lang as Lang,
				url: getPostUrl(translation),
			});
		}
	}

	return languages;
}

/**
 * Get the URL for a blog post based on language
 */
export function getPostUrl(post: BlogPost): string {
	const lang = post.data.lang;
	// Remove language folder prefix (e.g., "de/") from the slug for URL
	const slug = post.id.replace(/^[a-z]{2}\//, '');

	if (lang === defaultLang) {
		return `/posts/${slug}/`;
	}
	return `/${lang}/posts/${slug}/`;
}
