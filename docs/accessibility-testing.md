# Accessibility Testing with pa11y-ci

This project uses [pa11y-ci](https://github.com/pa11y/pa11y-ci) to automatically test all pages for WCAG 2.0 Level AA compliance.

## How It Works

pa11y-ci automatically discovers and tests all URLs from the sitemap:

1. Builds the site (`pnpm build`)
2. Starts a preview server (`pnpm preview`)
3. Fetches the sitemap at `http://localhost:4321/sitemap-index.xml`
4. Tests every URL found in the sitemap
5. Reports accessibility issues

## Running Tests Locally

### Prerequisites

Make sure you have a preview server running:

```bash
# Terminal 1: Build and start preview server
pnpm build
pnpm preview
```

### Run Tests

```bash
# Terminal 2: Run accessibility tests
pnpm test:a11y
```

The tests will automatically:

- Find all pages via sitemap
- Test each page with both Axe and HTML CodeSniffer
- Report WCAG 2.0 Level AA violations

## Configuration

Configuration is in [`.pa11yci.json`](../.pa11yci.json).

#### Test Specific URLs Only

Instead of using sitemap, you can test specific URLs:

```json
"urls": [
  "http://localhost:4321/",
  "http://localhost:4321/blog",
  "http://localhost:4321/about"
]
```

## Common Issues

### Issue: "Failed to load URL"

**Solution:** Make sure preview server is running

```bash
pnpm build && pnpm preview
```

### Issue: "Connection refused"

**Solution:** Wait longer for server to start

```bash
pnpm wait-on -t 60000 http://localhost:4321  # Wait up to 60 seconds
```

### Issue: Too many violations

**Solution:** Fix critical issues first, then add temporary ignores:

```json
"ignore": [
  "color-contrast",  // Fix later
  "region"           // Fix later
]
```

### Issue: Tests are slow

**Solution:** Reduce timeout or test fewer pages:

```json
"timeout": 10000,  // Reduce to 10 seconds
"concurrency": 2   // Test 2 pages at a time
```

## Resources

- [pa11y-ci Documentation](https://github.com/pa11y/pa11y-ci)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe Core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WebAIM Articles](https://webaim.org/articles/)
