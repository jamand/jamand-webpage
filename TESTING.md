# Testing Guide

This document outlines the testing strategy and best practices for this Astro project.

## Testing Stack

- **Vitest** - Unit and integration testing (fast, Vite-native)
- **@testing-library/react** - React component testing
- **happy-dom** - Lightweight DOM implementation for tests
- **pa11y** - Accessibility testing (TODO: configure)

## Running Tests

```bash
# Run tests in watch mode (development)
pnpm test

# Run tests once (CI)
pnpm test:run

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Run accessibility tests (TODO: needs URLs configured)
pnpm test:a11y
```

## Test Structure

Tests are colocated with source files using the `.test.ts` or `.spec.ts` suffix:

```
src/
├── utils.ts
├── utils.test.ts          ← Tests for utils
├── i18n/
│   ├── utils.ts
│   └── utils.test.ts      ← Tests for i18n utils
└── components/
    ├── Footer.astro
    └── Footer.test.ts     ← Tests for components (future)
```

## Example Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { getImageMimeType } from './utils';

describe('getImageMimeType', () => {
  it('should return correct MIME type for PNG', () => {
    expect(getImageMimeType('image.png')).toBe('image/png');
  });
});
```

See [src/utils.test.ts](src/utils.test.ts) and [src/i18n/utils.test.ts](src/i18n/utils.test.ts) for complete examples.

## Next Steps

### Phase 2: Component Testing

Test React components if you add interactive features:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import YourComponent from './YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Phase 3: Integration Testing

Test that Astro pages render correctly:

```typescript
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import BlogPost from './pages/blog/[slug].astro';

describe('Blog Post Page', () => {
  it('should render blog post', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(BlogPost, {
      props: {
        /* ... */
      },
    });
    expect(result).toContain('Expected Content');
  });
});
```

### Phase 4: E2E Testing with Playwright

For full user flows, consider adding Playwright:

```bash
pnpm add -D @playwright/test
```

Test navigation, search, filtering, etc.

### Phase 5: Accessibility Testing

Configure pa11y to test key pages:

```javascript
// pa11y.config.js
export default {
  urls: [
    'http://localhost:4321/',
    'http://localhost:4321/blog',
    'http://localhost:4321/about',
  ],
  standard: 'WCAG2AA',
};
```

## CI/CD Integration

Tests run automatically on every PR via [.github/workflows/test.yml](.github/workflows/test.yml):

- ✅ Unit tests run on every commit
- ✅ Tests must pass before merge
- ✅ Coverage reports generated (optional)

## Best Practices

1. **Write tests for bugs** - When you fix a bug, add a test to prevent regression
2. **Test behavior, not implementation** - Focus on what the code does, not how
3. **Keep tests simple** - Each test should verify one thing
4. **Use descriptive test names** - `it('should return 404 for invalid blog slug')` not `it('works')`
5. **Avoid testing framework code** - Don't test Astro itself, test your logic
6. **Mock external dependencies** - Use `vi.mock()` for API calls, file system, etc.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/)
- [pa11y Documentation](https://pa11y.org/)
