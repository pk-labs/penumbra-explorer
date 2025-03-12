/* eslint-disable perfectionist/sort-objects */
export default {
    plugins: {
        // TODO: Remove postcss-nesting once Tailwind no longer complains about
        //  unpure selectors used in tables etc.
        'postcss-nesting': {},
        '@tailwindcss/postcss': {},
    },
}
