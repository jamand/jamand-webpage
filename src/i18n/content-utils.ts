import { defaultLang, type Lang } from './translations';

type WithLang = { data: { lang: string } };

export type FallbackResult<T> = {
	item: T;
	group: T[];
	isFallback: boolean;
	originalLang: Lang;
};

/**
 * Group content items by a key and pick the best version for the requested language.
 * Falls back to defaultLang (English), then any available language.
 */
export function groupWithFallback<T extends WithLang>(
	items: T[],
	getGroupKey: (item: T) => string,
	lang: Lang,
): FallbackResult<T>[] {
	const grouped = new Map<string, T[]>();
	for (const item of items) {
		const key = getGroupKey(item);
		const existing = grouped.get(key) || [];
		existing.push(item);
		grouped.set(key, existing);
	}

	const results: FallbackResult<T>[] = [];
	for (const [, group] of grouped) {
		const native = group.find((p) => p.data.lang === lang);
		const fallback = native
			? undefined
			: group.find((p) => p.data.lang === defaultLang) || group[0];

		const chosen = native || fallback!;
		results.push({
			item: chosen,
			group,
			isFallback: !native,
			originalLang: chosen.data.lang as Lang,
		});
	}

	return results;
}
