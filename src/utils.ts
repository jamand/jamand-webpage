// General utility functions

/**
 * Get MIME type for an image URL based on file extension
 */
export function getImageMimeType(url: string): string {
	const ext = url.split('.').pop()?.toLowerCase();
	const types: Record<string, string> = {
		png: 'image/png',
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		gif: 'image/gif',
		webp: 'image/webp',
		svg: 'image/svg+xml',
	};
	return types[ext ?? ''] ?? 'image/jpeg';
}
