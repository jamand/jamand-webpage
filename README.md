# Jérémy Amand - Private webpage and blog

Personal portfolio website built with modern web technologies, showcasing projects, blog posts, and professional information.

## Tech Stack

- **[Astro](https://astro.build)** - Static site framework
- **[React](https://react.dev)** - UI components
- **[Tailwind CSS 4](https://tailwindcss.com)** - Styling
- **[DaisyUI](https://daisyui.com)** - Component library
- **[MDX](https://mdxjs.com)** - Blog content with components

### Development Tools

- **[ESLint](https://eslint.org)** - Linting (common issues)
- **[Prettier](https://prettier.io)** - Code formatting
- **[Lefthook](https://github.com/evilmartians/lefthook)** - Git hooks
- **[cspell](https://cspell.org)** - Spell checking for blog posts
- **[pa11y](https://pa11y.org)** - Accessibility testing

## Project Structure

```text
/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── blog/          # Blog posts (MDX)
│   ├── components/    # Reusable components
│   ├── layouts/       # Page layouts
│   ├── pages/         # File-based routing
│   └── styles/        # Global styles
└── package.json
```

## Development

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Install dependencies                             |
| `pnpm dev`             | Start local dev server at `localhost:4321`       |
| `pnpm build`           | Build production site to `./dist/`               |
| `pnpm preview`         | Preview build locally before deploying           |
| `pnpm lint`            | Run ESLint with accessibility checks             |
| `pnpm test:a11y <url>` | Run pa11y accessibility audit on a URL           |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |

### Pre-commit Hooks

On commit, Lefthook automatically runs:

- **Prettier** - Formats staged files (auto-fixes)
- **ESLint** - Checks `.js`, `.ts`, `.astro` files for issues
- **cspell** - Spell checks blog posts in `src/blog/`

## License

This project is open source under the [MIT License](LICENSE).
