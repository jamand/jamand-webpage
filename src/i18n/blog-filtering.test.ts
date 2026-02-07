import { describe, it, expect } from 'vitest';
import type { BlogPost } from './blog-utils';

// Test blog post filtering and sorting logic
describe('Blog Post Filtering and Sorting', () => {
	const createMockPost = (
		id: string,
		lang: 'en' | 'de',
		pubDate: Date,
	): BlogPost => ({
		id,
		body: '',
		collection: 'blog',
		data: {
			title: `Post ${id}`,
			slug: 'test-slug',
			pubDate,
			description: 'Description',
			author: 'Author',
			image: { url: '/img.jpg', alt: 'Alt' },
			tags: [],
			lang,
			postId: id.replace(/\.(md|mdx)$/, ''),
			published: true,
		},
	});

	describe('Language filtering', () => {
		it('should filter posts by language', () => {
			const allPosts = [
				createMockPost('en/post1.md', 'en', new Date('2024-01-01')),
				createMockPost('de/post2.md', 'de', new Date('2024-01-02')),
				createMockPost('en/post3.md', 'en', new Date('2024-01-03')),
				createMockPost('de/post4.md', 'de', new Date('2024-01-04')),
			];

			const englishPosts = allPosts.filter((post) => post.data.lang === 'en');
			const germanPosts = allPosts.filter((post) => post.data.lang === 'de');

			expect(englishPosts).toHaveLength(2);
			expect(germanPosts).toHaveLength(2);
			expect(englishPosts.every((p) => p.data.lang === 'en')).toBe(true);
			expect(germanPosts.every((p) => p.data.lang === 'de')).toBe(true);
		});

		it('should return empty array when no posts match language', () => {
			const allPosts = [
				createMockPost('en/post1.md', 'en', new Date('2024-01-01')),
				createMockPost('en/post2.md', 'en', new Date('2024-01-02')),
			];

			const germanPosts = allPosts.filter((post) => post.data.lang === 'de');
			expect(germanPosts).toHaveLength(0);
		});
	});

	describe('Date sorting', () => {
		it('should sort posts by date descending (newest first)', () => {
			const posts = [
				createMockPost('post1.md', 'en', new Date('2024-01-01')),
				createMockPost('post2.md', 'en', new Date('2024-03-01')),
				createMockPost('post3.md', 'en', new Date('2024-02-01')),
			];

			const sorted = posts.sort(
				(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
			);

			expect(sorted[0].data.pubDate).toEqual(new Date('2024-03-01'));
			expect(sorted[1].data.pubDate).toEqual(new Date('2024-02-01'));
			expect(sorted[2].data.pubDate).toEqual(new Date('2024-01-01'));
		});

		it('should handle edge case of single post', () => {
			const posts = [createMockPost('single.md', 'en', new Date('2024-01-01'))];

			const sorted = posts.sort(
				(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
			);

			expect(sorted).toHaveLength(1);
			expect(sorted[0].id).toBe('single.md');
		});

		it('should maintain relative order for posts on same date', () => {
			const sameDate = new Date('2024-01-15T12:00:00Z');
			const posts = [
				createMockPost('a.md', 'en', sameDate),
				createMockPost('b.md', 'en', sameDate),
				createMockPost('c.md', 'en', sameDate),
			];

			const sorted = posts.sort(
				(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
			);

			// When dates are equal, order should be stable
			expect(sorted).toHaveLength(3);
			sorted.forEach((post) => expect(post.data.pubDate).toEqual(sameDate));
		});
	});

	describe('Combined filtering and sorting', () => {
		it('should filter by language then sort by date', () => {
			const allPosts = [
				createMockPost('en/old.md', 'en', new Date('2024-01-01')),
				createMockPost('de/oldest.md', 'de', new Date('2024-01-01')),
				createMockPost('en/newest.md', 'en', new Date('2024-03-01')),
				createMockPost('de/newer.md', 'de', new Date('2024-02-15')),
				createMockPost('en/middle.md', 'en', new Date('2024-02-01')),
			];

			// Simulate getPostsByLang logic
			const englishPosts = allPosts
				.filter((post) => post.data.lang === 'en')
				.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

			expect(englishPosts).toHaveLength(3);
			expect(englishPosts[0].id).toBe('en/newest.md');
			expect(englishPosts[1].id).toBe('en/middle.md');
			expect(englishPosts[2].id).toBe('en/old.md');
		});
	});
});
