# penumbra-explorer

![Status](https://github.com/pk-labs/pe-frontend/actions/workflows/gcp.yaml/badge.svg)
![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fstpch%2F9208254a7b67b695d104a875931624d8%2Fraw%2Fpe-frontend-lcov-coverage.json&label=Coverage)

Penumbra Blockchain Explorer

## Getting started

1. Set up Node.js v22
2. Install dependencies with  `npm install`
3. Start the app with `npm run dev`

### npm scripts

| Script                    | Description                                           |
|---------------------------|-------------------------------------------------------|
| `npm run dev`             | Run app in development environment.                   |
| `npm run graphql:codegen` | Generates types and hooks in `lib/graphql/generated`. |
| `npm test`                | Run tests.                                            |
| `npm run test:coverage`   | Run with coverage report to console and file.         |
| `npm run test:watch`      | Run tests in watch mode.                              |
| `npm run lint`            | Lint JavaScript with ESLint.                          |
| `npm run lint:fix`        | Lint and fix JavaScript with ESLint.                  |
| `npm run stylelint`       | Lint CSS with Stylelint.                              |
| `npm run stylelint:fix`   | Fix and fix CSS with Stylelint.                       |
| `npm run typecheck`       | Check TypeScript code.                                |
| `npm run build`           | Build app for deployment.                             |
| `npm run clean`           | Removes build artifacts.                              |
| `npm start`               | Run app in deployment mode.                           |

### Project structure

| Directory           | Description                                                                                                                                                                                                    |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src/app`           | Next.js app router with layouts and pages.                                                                                                                                                                     |
| `src/components`    | Presentational components with little logic.                                                                                                                                                                   |
| `src/containers`    | Container components that perform data fetching or have logic other<br/>than presentational. Server components use React Suspense to show<br/>loading skeletons until Next.js finishes streaming fetched data. |
| `src/lib/`          | App-wide configuration, types, helpers, assets, etc.                                                                                                                                                           |
| `src/lib/__tests__` | Global test configuration.                                                                                                                                                                                     |
| `src/lib/css`       | Tailwind CSS configuration and theme.                                                                                                                                                                          |
| `src/lib/data`      | Data fetchers and transformers.                                                                                                                                                                                |
| `src/lib/fonts`     | Custom fonts loaded and optimized with next/font.                                                                                                                                                              |
| `src/lib/graphql`   | GraphQL client with schema, queries, generated code, etc.                                                                                                                                                      |
| `src/lib/hooks`     | Custom React hooks.                                                                                                                                                                                            |
| `src/lib/images`    | Image assets that are directly imported.                                                                                                                                                                       |
| `src/lib/utils`     | Utility functions for formatting, transforming, etc.                                                                                                                                                           |
| `public`            | Static public assets directly accessible through the browser.                                                                                                                                                  |

## GraphQL

GraphQL code such as queries and fragments is located in `sc/lib/graphql` and
uses the [urql](https://commerce.nearform.com/open-source/urql/) client to
connect to the backend. `scr/lib/graphql/generated` contains types, hooks, etc.
generated using `npm run graphql:codegen`.

## CSS, icons and fonts

The project uses [Tailwind CSS](https://tailwindcss.com/) with the global CSS
and theme at `src/lib/css`. It replicates the
[@penumbra-zone/ui](https://github.com/penumbra-zone/web/tree/main/packages/ui)
Tailwind v3 configuration in v4 and uses their components where possible.

https://lucide.dev/ is used for most icons. Some are custom and exported from
Figma.

The `Poppins` and `Work Sans` fonts are loaded with `next/font/google` whereas
`Iosevka` is built from source and loaded with `next/font/local` from
`src/lib/fonts`.

## Linting

TypeScript is linted and autoformatted with ESLint and Prettier. CSS is linted
and autoformatted with Stylelint.

## Testing

Jest tests are collocated with the tested files. Global test configuration and
mocks reside in `src/lib/__tests__`. Test coverage can be reported to console
and written to file with `npm run test:coverage`.

## Environments

The following environments are hosted and auto-scaled on Google Cloud:

- Development (`main`): https://dev.explorer.penumbra.pklabs.me
- Staging (`staging`): https://explorer.penumbra.pklabs.me
- Production (`production`): https://explorer.penumbra.zone

## CI/CD

The GitHub Actions workflow `.github/workflows/gcp.yaml` handles all environment
deployments. After running checks and tests it triggers Google Cloud Build that
deploys to Google Cloud Run.

Development is deployed continuously on push with `.github/workflows/dev.yaml`
as entry point. Staging is also deployed on push with
`.github/workflows/staging.yaml` as entry point and production deployments are
triggered manually in the GitHub Actions web interface with
`.github/workflows/prod.yaml` as entry point.

## Misc

- https://day.js.org/ for date manipulation and formatting
- https://motion.dev/ for animations such as dashboard number count-up
- https://github.com/lukeed/clsx for conditional `className` construction
- https://github.com/dcastil/tailwind-merge for merging Tailwind classes
- https://usefathom.com/ for production page view analytics
