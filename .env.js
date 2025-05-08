// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require('./package.json')

const envName = process.env._ENV_NAME || 'dev'

const environments = {
    dev: {
        BASE_URL: 'https://dev.explorer.penumbra.pklabs.me',
        NEXT_PUBLIC_ENV_NAME: 'dev',
        NEXT_PUBLIC_GRAPHQL_HOST: 'dev.api.explorer.penumbra.pklabs.me',
        NO_INDEX: true,
    },
    prod: {
        BASE_URL: 'https://explorer.penumbra.zone',
        NEXT_PUBLIC_ENV_NAME: 'prod',
        NEXT_PUBLIC_FATHOM_ID: 'YHKFXWRT',
        NEXT_PUBLIC_GRAPHQL_HOST: 'api.explorer.penumbra.zone',
    },
    staging: {
        BASE_URL: 'https://explorer.penumbra.pklabs.me',
        NEXT_PUBLIC_ENV_NAME: 'staging',
        NEXT_PUBLIC_GRAPHQL_HOST: 'api.explorer.penumbra.pklabs.me',
        NO_INDEX: true,
    },
}

module.exports = {
    ...environments[envName],
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
}
