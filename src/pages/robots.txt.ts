import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

# Block AI/LLM crawlers
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: anthropic-ai
User-agent: ClaudeBot
User-agent: CCBot
User-agent: cohere-ai
User-agent: PerplexityBot
User-agent: Bytespider
User-agent: FacebookBot
User-agent: Amazonbot
User-agent: GrokBot
Disallow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL('sitemap-index.xml', site);
	return new Response(getRobotsTxt(sitemapURL));
};
