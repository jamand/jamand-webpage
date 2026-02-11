import { toString } from 'mdast-util-to-string';

const WORDS_PER_MINUTE = 150;

export function remarkReadingTime() {
	return (tree, { data }) => {
		const text = toString(tree);
		const words = text.split(/\s+/).filter(Boolean).length;
		const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
		data.astro.frontmatter.readingTime = minutes;
	};
}
