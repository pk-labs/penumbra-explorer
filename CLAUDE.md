# Claude development guide

## Commands
- **Build:** `npm run build` (production), `npm run dev` (development)
- **Lint:** `npm run lint` (check), `npm run lint:fix` (auto-fix)
- **Style:** `npm run stylelint` (check), `npm run stylelint:fix` (auto-fix)
- **Typecheck:** `npm run typecheck`
- **Test:** 
  - All tests: `npm test`
  - Single test: `npm test -- -t "test name"` or path: `npm test -- path/to/test.tsx`
  - Watch mode: `npm run test:watch`
  - Coverage: `npm run test:coverage`
  
**Important:** Always run both `npm run lint:fix` and `npm run stylelint:fix` after making changes to files

## Code style
- **Imports:** Group by external/internal, sort alphabetically
- **Formatting:** No semicolons, single quotes, 4 spaces, avoid parens in arrow functions
- **Types:** Use TypeScript interfaces for React props, prefer explicit types
- **Naming:** 
  - React components: PascalCase
  - Functions/variables: camelCase
  - Files: camelCase.tsx for components
- **Error handling:** 
  - Use try/catch in async operations, check for undefined/null values
  - Use `e` as the catch parameter (not `error`)
  - Log errors simply without custom messages: `console.error(e)`
- **Components:** React functional components with `FC<Props>` typing
- **CSS:** Use Tailwind CSS with twMerge to merge in props.className or to split long lines
- **Tests:** 
  - Always use `test()` instead of `it()`
  - All test functions should be async
  - Test descriptions should be clear and descriptive

## Git commit guidelines
- **Format:** Use imperative mood (e.g., "Add feature" not "Added feature")
- **Style:** Start with a verb, be concise (50 chars or less for the title)
- **Co-authorship:** Always include the co-authorship message for AI-assisted commits:
  ```
  🤖 Generated with Claude Code: https://claude.ai/code
  ```
- **Example:** `Fix TimeAgo component to handle undefined dates`
