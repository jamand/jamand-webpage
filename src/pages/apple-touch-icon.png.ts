// Generates a 180x180 PNG apple-touch-icon from the SVG logo at build time
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const GET: APIRoute = async () => {
	const svg = readFileSync(join(process.cwd(), 'public', 'JA-logo.svg'));
	const png = await sharp(svg).resize(180, 180).png().toBuffer();

	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
