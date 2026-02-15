import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './translations';
import { groupWithFallback } from './content-utils';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Get all published posts (filters out published: false)
 */
async function getPublishedPosts(): Promise<BlogPost[]> {
	const allPosts = await getCollection('blog');
	return allPosts.filter((post) => post.data.published !== false);
}

/**
 * Get all posts for a specific language (native only, no fallback)
 */
export async function getPostsByLang(lang: Lang): Promise<BlogPost[]> {
	const allPosts = await getPublishedPosts();
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
	const allPosts = await getPublishedPosts();
	const translation = allPosts.find(
		(p) => p.data.postId === post.data.postId && p.data.lang !== post.data.lang,
	);

	return { post, translation };
}

/**
 * Check if a post has a translation available
 */
export async function hasTranslation(post: BlogPost): Promise<boolean> {
	const allPosts = await getPublishedPosts();
	return allPosts.some(
		(p) => p.data.postId === post.data.postId && p.data.lang !== post.data.lang,
	);
}

export type AvailableLanguage = {
	lang: Lang;
	url: string;
};

/**
 * Get the URL for a blog post based on its own language
 */
export function getPostUrl(post: BlogPost): string {
	const lang = post.data.lang;
	const slug = post.data.slug;

	if (lang === defaultLang) {
		return `/posts/${slug}/`;
	}
	return `/${lang}/posts/${slug}/`;
}

/**
 * Get the URL for a blog post in a specific page language context.
 * Used in listings where the URL should match the page language, not the content language.
 */
export function getPostUrlForLang(post: BlogPost, pageLang: Lang): string {
	const slug = post.data.slug;
	if (pageLang === defaultLang) {
		return `/posts/${slug}/`;
	}
	return `/${pageLang}/posts/${slug}/`;
}

// --- Fallback-aware functions ---

export type PostWithFallbackInfo = {
	post: BlogPost;
	isFallback: boolean;
	originalLang: Lang;
	availableLanguages: AvailableLanguage[];
};

/**
 * Group posts by postId and pick the best version for the requested language.
 * Falls back to defaultLang (English), then any available language.
 */
export async function getPostsWithFallback(
	lang: Lang,
): Promise<PostWithFallbackInfo[]> {
	const allPosts = await getPublishedPosts();

	return groupWithFallback(allPosts, (p) => p.data.postId, lang)
		.map(({ item, group, isFallback, originalLang }) => ({
			post: item,
			isFallback,
			originalLang,
			availableLanguages: group.map((p) => ({
				lang: p.data.lang as Lang,
				url: getPostUrl(p),
			})),
		}))
		.sort(
			(a, b) => b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf(),
		);
}

/**
 * Get the previous and next posts adjacent to the given post (sorted by date, newest first).
 * "Previous" = older post, "Next" = newer post.
 */
export async function getAdjacentPosts(
	post: BlogPost,
	lang: Lang,
): Promise<{ prev?: BlogPost; next?: BlogPost }> {
	const posts = await getPostsWithFallback(lang);
	const index = posts.findIndex((p) => p.post.data.postId === post.data.postId);
	return {
		prev: posts[index + 1]?.post,
		next: posts[index - 1]?.post,
	};
}

/**
 * Get all post slugs for a language (including fallback) for getStaticPaths()
 */
export async function getAllPostSlugsForLang(lang: Lang): Promise<
	Array<{
		slug: string;
		post: BlogPost;
		isFallback: boolean;
		originalLang: Lang;
	}>
> {
	const allPosts = await getPublishedPosts();

	return groupWithFallback(allPosts, (p) => p.data.postId, lang).map(
		({ item, isFallback, originalLang }) => ({
			slug: item.data.slug,
			post: item,
			isFallback,
			originalLang,
		}),
	);
}
