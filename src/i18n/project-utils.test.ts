import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Project } from './project-utils';

const mockGetCollection = vi.fn();
vi.mock('astro:content', () => ({
	getCollection: mockGetCollection,
}));

const {
	getProjectsByLangWithFallback,
	getAllProjectSlugsForLang,
	getProjectUrl,
} = await import('./project-utils');

function createMockProject(overrides: Partial<Project> = {}): Project {
	return {
		id: 'test-project.mdx',
		body: '',
		collection: 'projects',
		data: {
			title: 'Test Project',
			slug: 'test-project',
			description: 'A test project',
			image: { url: '/test.jpg', alt: 'Test' },
			tags: ['Test'],
			lang: 'en',
			projectId: 'test-project',
			sortOrder: 0,
			...overrides.data,
		},
		...overrides,
	} as Project;
}

beforeEach(() => {
	mockGetCollection.mockReset();
});

describe('project-utils', () => {
	describe('getProjectUrl', () => {
		it('should return URL without prefix for default language', () => {
			const project = createMockProject({
				data: {
					title: 'Test',
					slug: 'my-project',
					description: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					tags: [],
					lang: 'en',
					projectId: 'my-project',
					sortOrder: 0,
				},
			});
			expect(getProjectUrl(project, 'en')).toBe('/projects/my-project/');
		});

		it('should return URL with language prefix for non-default language', () => {
			const project = createMockProject({
				data: {
					title: 'Test',
					slug: 'my-project',
					description: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					tags: [],
					lang: 'en',
					projectId: 'my-project',
					sortOrder: 0,
				},
			});
			expect(getProjectUrl(project, 'de')).toBe('/de/projects/my-project/');
		});
	});

	describe('getProjectsByLangWithFallback', () => {
		it('should return native project when available', async () => {
			const enProject = createMockProject({
				data: {
					title: 'English Project',
					slug: 'my-project',
					description: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					tags: [],
					lang: 'en',
					projectId: 'my-project',
					sortOrder: 1,
				},
			});
			const deProject = createMockProject({
				data: {
					title: 'German Project',
					slug: 'my-project',
					description: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					tags: [],
					lang: 'de',
					projectId: 'my-project',
					sortOrder: 1,
				},
			});
			mockGetCollection.mockResolvedValue([enProject, deProject]);

			const results = await getProjectsByLangWithFallback('de');
			expect(results).toHaveLength(1);
			expect(results[0].isFallback).toBe(false);
			expect(results[0].project.data.lang).toBe('de');
		});

		it('should fall back to English when native language is unavailable', async () => {
			const enProject = createMockProject({
				data: {
					title: 'English Only',
					slug: 'english-only',
					description: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					tags: [],
					lang: 'en',
					projectId: 'english-only',
					sortOrder: 1,
				},
			});
			mockGetCollection.mockResolvedValue([enProject]);

			const results = await getProjectsByLangWithFallback('de');
			expect(results).toHaveLength(1);
			expect(results[0].isFallback).toBe(true);
			expect(results[0].originalLang).toBe('en');
		});

		it('should sort by sortOrder', async () => {
			const project1 = createMockProject({
				data: {
					title: 'Second',
					slug: 'second',
					description: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					tags: [],
					lang: 'en',
					projectId: 'second',
					sortOrder: 2,
				},
			});
			const project2 = createMockProject({
				data: {
					title: 'First',
					slug: 'first',
					description: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					tags: [],
					lang: 'en',
					projectId: 'first',
					sortOrder: 1,
				},
			});
			mockGetCollection.mockResolvedValue([project1, project2]);

			const results = await getProjectsByLangWithFallback('en');
			expect(results[0].project.data.title).toBe('First');
			expect(results[1].project.data.title).toBe('Second');
		});
	});

	describe('getAllProjectSlugsForLang', () => {
		it('should generate fallback slug entries', async () => {
			const enProject = createMockProject({
				data: {
					title: 'English Only',
					slug: 'my-project',
					description: 'Test',
					image: { url: '/img.jpg', alt: 'Alt' },
					tags: [],
					lang: 'en',
					projectId: 'my-project',
					sortOrder: 1,
				},
			});
			mockGetCollection.mockResolvedValue([enProject]);

			const entries = await getAllProjectSlugsForLang('de');
			expect(entries).toHaveLength(1);
			expect(entries[0].slug).toBe('my-project');
			expect(entries[0].isFallback).toBe(true);
		});
	});
});
