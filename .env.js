const envName = process.env._ENV_NAME || 'dev'

const environments = {
    dev: {
        BASE_URL: 'https://dev.explorer.penumbra.pklabs.me',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
        NO_INDEX: true,
    },
    prod: {
        BASE_URL: 'https://explorer.penumbra.zone',
        NEXT_PUBLIC_FATHOM_ID: 'YHKFXWRT',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
        NO_INDEX: false,
    },
    staging: {
        BASE_URL: 'https://explorer.penumbra.pklabs.me',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
        NO_INDEX: true,
    },
}

module.exports = environments[envName]
