import { toString } from 'mdast-util-to-string';
import type { Root } from 'mdast';

const WORDS_PER_MINUTE = 150;

export function remarkReadingTime() {
	return (tree: Root, file: { data: Record<string, unknown> }) => {
		const text = toString(tree);
		const words = text.split(/\s+/).filter(Boolean).length;
		const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
		const astro = file.data.astro as Record<string, Record<string, unknown>>;
		astro.frontmatter.readingTime = minutes;
	};
}
