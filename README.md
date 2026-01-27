# Jérémy Amand - Private webpage and blog

Personal portfolio website built with modern web technologies, showcasing projects, blog posts, and professional information.

## Tech Stack

- **[Astro](https://astro.build)** - Static site framework
- **[React](https://react.dev)** - UI components
- **[Tailwind CSS 4](https://tailwindcss.com)** - Styling
- **[DaisyUI](https://daisyui.com)** - Component library
- **[MDX](https://mdxjs.com)** - Blog content with components

## Project Structure

```text
/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images, fonts, etc.
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
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## License

This project is open source under the [MIT License](LICENSE).
