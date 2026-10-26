// RSS feed generator - provides an RSS feed of English blog posts
import rss from '@astrojs/rss';
import { getPostsByLang, getPostUrl } from '../i18n/blog-utils';
import { getImageMimeType } from '../utils';
import type { APIContext } from 'astro';

export async function GET({ site }: APIContext) {
	const posts = await getPostsByLang('en');
	return rss({
		title: 'Jérémy Amand | Blog',
		description: 'My personal blog',
		site: site!,
		items: posts.map((post) => {
			const imageUrl = post.data.image.src?.src || post.data.image.url;
			return {
				title: post.data.title,
				pubDate: post.data.pubDate,
				description: post.data.description,
				link: getPostUrl(post),
				...(imageUrl && {
					enclosure: {
						url: new URL(imageUrl, site).href,
						length: 0,
						type: getImageMimeType(imageUrl),
					},
				}),
			};
		}),
		customData: `<language>en-us</language>`,
	});
}
