import { describe, it, expect } from 'vitest';
import { getImageMimeType } from './utils';

describe('getImageMimeType', () => {
	it('should return correct MIME type for PNG', () => {
		expect(getImageMimeType('image.png')).toBe('image/png');
		expect(getImageMimeType('/path/to/image.PNG')).toBe('image/png');
	});

	it('should return correct MIME type for JPEG', () => {
		expect(getImageMimeType('photo.jpg')).toBe('image/jpeg');
		expect(getImageMimeType('photo.jpeg')).toBe('image/jpeg');
		expect(getImageMimeType('/images/photo.JPG')).toBe('image/jpeg');
	});

	it('should return correct MIME type for other formats', () => {
		expect(getImageMimeType('animation.gif')).toBe('image/gif');
		expect(getImageMimeType('modern.webp')).toBe('image/webp');
		expect(getImageMimeType('icon.svg')).toBe('image/svg+xml');
	});

	it('should default to image/jpeg for unknown extensions', () => {
		expect(getImageMimeType('file.unknown')).toBe('image/jpeg');
		expect(getImageMimeType('noextension')).toBe('image/jpeg');
	});

	it('should handle URLs with query parameters', () => {
		expect(getImageMimeType('image.png?size=large')).toBe('image/jpeg');
	});

	it('should handle empty strings', () => {
		expect(getImageMimeType('')).toBe('image/jpeg');
	});
});
