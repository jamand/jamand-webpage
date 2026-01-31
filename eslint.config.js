import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
	...eslintPluginAstro.configs.recommended,

	// Accessibility rules for JSX/Astro
	{
		plugins: {
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...jsxA11y.configs.strict.rules,
		},
	},

	{
		ignores: ['dist/', 'node_modules/', '.astro/'],
	},
];
