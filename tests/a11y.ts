// Accessibility test script using pa11y with Puppeteer page control
// Emulates prefers-reduced-motion and tests both light/dark themes
// Reference: https://github.com/pa11y/pa11y/issues/690
//
// Usage:
//   npx tsx tests/a11y.ts                          # Test all pages from sitemap
//   npx tsx tests/a11y.ts /about/ /blog/           # Test specific paths only
//   npx tsx tests/a11y.ts --screenshots /about/    # Save screenshots to tests/screenshots/

import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import pa11y from 'pa11y';

const require = createRequire(import.meta.url);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const puppeteer: any = require(
	require.resolve('puppeteer', { paths: [require.resolve('pa11y')] }),
);

const BASE_URL = process.env.BASE_URL || 'http://localhost:4321';
const SITEMAP_URL = `${BASE_URL}/sitemap-index.xml`;
const args = process.argv.slice(2);
const saveScreenshots = args.includes('--screenshots');
if (saveScreenshots) {
	mkdirSync('tests/screenshots', { recursive: true });
}
const URLS = args.filter((a) => !a.startsWith('--'));
const themes = ['light', 'dark'] as const;

async function fetchSitemapUrls(): Promise<string[]> {
	const res = await fetch(SITEMAP_URL);
	const xml = await res.text();

	// Extract sitemap URLs from sitemap index
	const sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
		(m) => m[1],
	);

	const pageUrls: string[] = [];
	for (const sitemapUrl of sitemapUrls) {
		const sitemapRes = await fetch(sitemapUrl);
		const sitemapXml = await sitemapRes.text();
		const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
			(m) => m[1],
		);
		pageUrls.push(...urls);
	}

	return pageUrls;
}

async function getPageUrls(): Promise<string[]> {
	if (URLS.length > 0) {
		return URLS.map((u) => (u.startsWith('http') ? u : `${BASE_URL}${u}`));
	}
	return fetchSitemapUrls();
}

async function checkServer(): Promise<void> {
	try {
		await fetch(BASE_URL);
	} catch {
		console.error(
			`\nError: No server running at ${BASE_URL}\n` +
				`Start one first with: pnpm preview (or pnpm dev)\n`,
		);
		process.exit(1);
	}
}

async function runTests(): Promise<void> {
	await checkServer();
	const pagesToTest = await getPageUrls();
	console.log(`Found ${pagesToTest.length} URLs to test\n`);

	let totalErrors = 0;
	let totalPassed = 0;
	let totalTests = 0;

	for (const theme of themes) {
		console.log(`${'='.repeat(60)}`);
		console.log(`Testing ${theme.toUpperCase()} mode`);
		console.log('='.repeat(60));

		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});

		for (const url of pagesToTest) {
			totalTests++;
			const page = await browser.newPage();
			await page.emulateMediaFeatures([
				{ name: 'prefers-color-scheme', value: theme },
				{ name: 'prefers-reduced-motion', value: 'reduce' },
			]);

			const pa11yOptions: Record<string, unknown> = {
				standard: 'WCAG2AA',
				runners: ['axe', 'htmlcs'],
				ignore: [],
				browser,
				page,
			};

			if (saveScreenshots) {
				const slug = url.replace(BASE_URL, '').replace(/\//g, '_') || 'home';
				pa11yOptions.screenCapture = `tests/screenshots/${theme}-${slug}.png`;
			}

			try {
				const results = await pa11y(url, pa11yOptions);

				if (results.issues.length === 0) {
					console.log(` ✓ ${url}`);
					totalPassed++;
				} else {
					console.log(` ✗ ${url} - ${results.issues.length} errors`);
					totalErrors += results.issues.length;
					for (const issue of results.issues) {
						const runner =
							(issue as unknown as Record<string, unknown>).runner ?? 'unknown';
						console.log(`   • [${runner}] ${issue.message}`);
						if (issue.context) {
							console.log(`     ${issue.context.substring(0, 100)}`);
						}
					}
				}
			} catch (err) {
				console.log(` ✗ ${url} - ERROR: ${(err as Error).message}`);
				totalErrors++;
			}

			await page.close();
		}

		await browser.close();
		console.log();
	}

	console.log('='.repeat(60));
	console.log(
		`Results: ${totalPassed}/${totalTests} passed, ${totalErrors} total errors`,
	);
	console.log('='.repeat(60));

	process.exit(totalErrors > 0 ? 1 : 0);
}

runTests();
