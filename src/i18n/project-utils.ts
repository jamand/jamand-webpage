import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './translations';
import { groupWithFallback } from './content-utils';

export type Project = CollectionEntry<'projects'>;

export type ProjectWithFallbackInfo = {
	project: Project;
	isFallback: boolean;
	originalLang: Lang;
};

/**
 * Get the URL for a project page in a specific language context
 */
export function getProjectUrl(project: Project, lang: Lang): string {
	const slug = project.data.slug;
	if (lang === defaultLang) {
		return `/projects/${slug}/`;
	}
	return `/${lang}/projects/${slug}/`;
}

/**
 * Get all projects for a language with fallback to other languages.
 * Falls back to defaultLang (English), then any available language.
 */
export async function getProjectsByLangWithFallback(
	lang: Lang,
): Promise<ProjectWithFallbackInfo[]> {
	const allProjects = await getCollection('projects');

	return groupWithFallback(allProjects, (p) => p.data.projectId, lang)
		.map(({ item, isFallback, originalLang }) => ({
			project: item,
			isFallback,
			originalLang,
		}))
		.sort((a, b) => a.project.data.sortOrder - b.project.data.sortOrder);
}

/**
 * Get all project slugs for a language (including fallback) for getStaticPaths()
 */
export async function getAllProjectSlugsForLang(lang: Lang): Promise<
	Array<{
		slug: string;
		project: Project;
		isFallback: boolean;
		originalLang: Lang;
	}>
> {
	const allProjects = await getCollection('projects');

	return groupWithFallback(allProjects, (p) => p.data.projectId, lang).map(
		({ item, isFallback, originalLang }) => ({
			slug: item.data.slug,
			project: item,
			isFallback,
			originalLang,
		}),
	);
}
