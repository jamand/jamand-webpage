// RSS feed generator - provides an RSS feed of all blog posts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET({ site }: APIContext) {
	const posts = await getCollection('blog');
	return rss({
		title: 'Jérémy Amand | Blog',
		description: 'My personal blog',
		site: site!,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/posts/${post.id}/`,
		})),
		customData: `<language>en-us</language>`,
	});
}
