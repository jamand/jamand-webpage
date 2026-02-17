// Type shim — eslint-plugin-jsx-a11y does not ship type declarations
declare module 'eslint-plugin-jsx-a11y' {
	const plugin: {
		configs: {
			strict: { rules: Record<string, unknown> };
			recommended: { rules: Record<string, unknown> };
		};
	};
	export default plugin;
}
