import { describe, it, expect } from 'vitest';
import type { BlogPost } from '../i18n/blog-utils';
import { getImageMimeType } from '../utils';

// Test the RSS item mapping logic
describe('RSS Feed Generation', () => {
	const createMockPost = (
		id: string,
		pubDate: Date,
		lang: 'en' | 'de',
	): BlogPost => ({
		id,
		body: '',
		collection: 'blog',
		data: {
			title: `Test Post ${id}`,
			slug: 'test-slug',
			pubDate,
			description: 'Test description',
			author: 'Test Author',
			image: {
				url: '/images/test.png',
				alt: 'Test image',
			},
			tags: ['test'],
			lang,
			postId: id.replace(/\.(md|mdx)$/, ''),
			published: true,
		} as BlogPost['data'],
	});

	describe('RSS item structure', () => {
		it('should include all required RSS fields', () => {
			const post = createMockPost('test-post.md', new Date('2024-01-15'), 'en');
			const site = 'https://example.com';

			// Simulate RSS item creation (mirrors rss.xml.ts logic)
			const imageUrl = post.data.image.src?.src || post.data.image.url;
			const rssItem = {
				title: post.data.title,
				pubDate: post.data.pubDate,
				description: post.data.description,
				link: `/posts/${post.id.replace('.md', '')}/`,
				...(imageUrl && {
					enclosure: {
						url: new URL(imageUrl, site).href,
						length: 0,
						type: getImageMimeType(imageUrl),
					},
				}),
			};

			expect(rssItem.title).toBe('Test Post test-post.md');
			expect(rssItem.pubDate).toEqual(new Date('2024-01-15'));
			expect(rssItem.description).toBe('Test description');
			expect(rssItem.link).toBe('/posts/test-post/');
			expect(rssItem.enclosure?.url).toBe(
				'https://example.com/images/test.png',
			);
			expect(rssItem.enclosure?.type).toBe('image/png');
		});

		it('should correctly resolve image URLs with site base', () => {
			const post = createMockPost('test.md', new Date(), 'en');
			const site = 'https://example.com';

			const imageUrl = post.data.image.src?.src || post.data.image.url;
			expect(new URL(imageUrl!, site).href).toBe(
				'https://example.com/images/test.png',
			);
		});

		it('should handle different image formats in enclosure', () => {
			const testCases = [
				{ url: '/img/photo.jpg', expectedType: 'image/jpeg' },
				{ url: '/img/graphic.png', expectedType: 'image/png' },
				{ url: '/img/animation.gif', expectedType: 'image/gif' },
				{ url: '/img/modern.webp', expectedType: 'image/webp' },
			];

			testCases.forEach(({ url, expectedType }) => {
				const type = getImageMimeType(url);
				expect(type).toBe(expectedType);
			});
		});
	});

	describe('Post sorting for RSS feed', () => {
		it('should sort posts by date descending (newest first)', () => {
			const posts = [
				createMockPost('old.md', new Date('2024-01-01'), 'en'),
				createMockPost('newest.md', new Date('2024-03-01'), 'en'),
				createMockPost('middle.md', new Date('2024-02-01'), 'en'),
			];

			// Simulate the sorting done in getPostsByLang
			const sorted = posts.sort(
				(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
			);

			expect(sorted[0].id).toBe('newest.md');
			expect(sorted[1].id).toBe('middle.md');
			expect(sorted[2].id).toBe('old.md');
		});

		it('should handle posts with same date', () => {
			const sameDate = new Date('2024-01-15');
			const posts = [
				createMockPost('post1.md', sameDate, 'en'),
				createMockPost('post2.md', sameDate, 'en'),
				createMockPost('post3.md', sameDate, 'en'),
			];

			const sorted = posts.sort(
				(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
			);

			// Order should be stable for same dates
			expect(sorted).toHaveLength(3);
			sorted.forEach((post) => {
				expect(post.data.pubDate).toEqual(sameDate);
			});
		});
	});
});
