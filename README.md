# pe-frontend

![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fstpch%2F9208254a7b67b695d104a875931624d8%2Fraw%2Fccdb1323935e2a3914d9505ceb8210013690215e%2Fpe-frontend-lcov-coverage.json&label=Coverage)

Penumbra Blockchain Explorer

## Getting started

1. Make sure Node.js v22 development is set up.
2. Install dependencies with  `npm install`.
3. Start the app with `npm run dev`.

Or check out the deployed version at
<https://pe-frontend-564694434950.europe-west6.run.app/>.

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

| Directory                    | Description                                                           |
|------------------------------|-----------------------------------------------------------------------|
| `src/app`                    | Next.js app router with layouts and pages.                            |
| `src/components`             | Components used by layouts and pages.                                 |
| `src/lib`                    | Logic, helpers, types, assets, etc. used across the app.              |
| `src/__tests__`              | Global test configuration.                                            |
| `src/__tests__/__fixtures__` | Block and transaction fixtures generated with `npm run test:codegen`. |
| `public`                     | Static public assets accessible through the browser.                  |

## Components, CSS, icons and fonts

The UI and theme replicate the provided [Figma mocks](https://bit.ly/3WRV2bK) as
close as possible. All components are built from scratch as
<https://github.com/penumbra-zone/web> and <https://ui.penumbra.zone/> don't
seem to provide fitting ones for this task.

The project uses CSS modules with the global CSS and theme at `src/lib/css`. It
uses modern CSS with variables, flex, grid, animations, etc. Most components can
be overridden with `className`. PostCSS plugins add additional features such as
normalizing and nesting. Tailwind was considered but ultimately I went for this
approach as I haven't used Tailwind in a while.

<https://lucide.dev/> is used for most icons. Some are custom and extracted from
Figma.

The `Poppins` and `Work Sans` fonts are loaded with `next/font/google` whereas
`Iosevka` is built from source and loaded with `next/font/local` from
`src/lib/fonts`.

## Linting

TypeScript is linted and autoformatted with ESLint and Prettier mimicking the
configuration at <https://github.com/penumbra-zone/web>. CSS is linted and
autoformatted with Stylelint.

## Testing

Jest tests are collocated with the components. Global test configuration and
mocks reside in `src/__tests__`. Test coverage can be reported to console and
written to file with `npm run test:coverage`.

## CI/CD

On push, the GitHub Actions workflow `.github/workflows/gcp.yaml` is triggered.
First it runs all  checks (linting, typechecking, testing) and uploads a test
coverage report to Codecov with a badge displayed at the top of this file. Then
it triggers Google Cloud Build which  deploys the app to Google Cloud Run at
<https://pe-frontend-564694434950.europe-west6.run.app/>.

## Misc

- <https://day.js.org/> for date manipulation and formatting
- <https://fakerjs.dev/> to generate test data
- <https://github.com/glennreyes/react-countup> for dashboard number animation
- <https://github.com/lukeed/clsx> for conditional `className` construction
