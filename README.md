# pe-frontend

![Status](https://github.com/pk-labs/pe-frontend/actions/workflows/gcp.yaml/badge.svg)
![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fstpch%2F9208254a7b67b695d104a875931624d8%2Fraw%2Fpe-frontend-lcov-coverage.json&label=Coverage)

Penumbra Blockchain Explorer

## Getting started

1. Set up Node.js v22
2. Install dependencies with  `npm install`
3. Start the app with `npm run dev`

### npm scripts

| Script                      | Description                                  |
|-----------------------------|----------------------------------------------|
| `npm run dev`               | Run app in development environment.          |
| `npm test`                  | Run tests.                                   |
| `npm run test:coverage`     | Run with coverage report to console and file. |
| `npm run test:codegen`      | Generate block and transaction fixtures.     |
| `npm run test:watch`        | Run tests in watch mode.                     |
| `npm run lint`              | Lint JavaScript with ESLint.                 |
| `npm run lint:fix`          | Lint and fix JavaScript with ESLint.         |
| `npm run stylelint`         | Lint CSS with Stylelint.                     |
| `npm run stylelint:fix`     | Fix and fix CSS with Stylelint.              |
| `npm run typecheck`         | Check TypeScript code.                       |
| `npm run build`             | Build app for deployment.                    |
| `npm start`                 | Run app in deployment environment.           |

### Project structure

| Directory                        | Description                                                           |
|----------------------------------|-----------------------------------------------------------------------|
| `src/app`                        | Next.js app router with layouts and pages.                            |
| `src/components`                 | Components used by layouts and pages.                                 |
| `src/lib`                        | Configuration, logic, types, assets, etc. used across the app.        |
| `src/lib/__tests__`              | Global test configuration.                                            |
| `src/lib/__tests__/__fixtures__` | Block and transaction fixtures generated with `npm run test:codegen`. |
| `public`                         | Static public assets accessible through the browser.                  |

## CSS, icons and fonts

The project uses CSS modules with the global CSS and theme at `src/lib/css`.
Theming is done with CSS variables and most components can be overridden with
`className`. PostCSS plugins add additional features such as normalizing and
nesting.

<https://lucide.dev/> is used for most icons. Some are custom and exported from
Figma.

The `Poppins` and `Work Sans` fonts are loaded with `next/font/google` whereas
`Iosevka` is built from source and loaded with `next/font/local` from
`src/lib/fonts`.

## Linting

TypeScript is linted and autoformatted with ESLint and Prettier. CSS is linted
and autoformatted with Stylelint.

## Testing

Jest tests are collocated with the components. Global test configuration and
mocks reside in `src/lib/__tests__`. Test coverage can be reported to console
and written to file with `npm run test:coverage`.

## CI/CD

On push, the GitHub Actions workflow `.github/workflows/gcp.yaml` is triggered,
running checks and tests and deploying the application to Google Cloud at
<https://pe-frontend-564694434950.europe-west6.run.app/>.

## Misc

- <https://day.js.org/> for date manipulation and formatting
- <https://motion.dev/> for animations such as dashboard number countup
- <https://github.com/lukeed/clsx> for conditional `className` construction
- <https://fakerjs.dev/> to generate test data
