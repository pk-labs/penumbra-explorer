# pe-frontend

Penumbra Blockchain Explorer

## Getting started

1. Make sure Node.js v22 development is set up.
2. Install dependencies with  `npm install`.
3. Start the app with `npm run dev`.

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

## Linting

TypeScript is linted and autoformatted with ESLint and Prettier mimicking the configuration at
<https://github.com/penumbra-zone/web>. CSS is linted and autoformatted with Stylelint.

## Testing

Jest tests are collocated with the components. Global test configuration and mocks reside in
`src/__tests__`. Test coverage can be reported to console and written to file with
`npm run test:coverage`.

## Misc

- <https://day.js.org/> for date manipulation and formatting
- <https://fakerjs.dev/> to generate test data
- <https://github.com/glennreyes/react-countup> for dashboard number animation
- <https://github.com/lukeed/clsx> for conditional `className` construction

