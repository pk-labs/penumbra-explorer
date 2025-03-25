const envName = process.env._ENV_NAME || 'dev'

const environments = {
    dev: {
        BASE_URL: 'https://dev.explorer.penumbra.pklabs.me',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
    },
    prod: {
        BASE_URL: 'https://explorer.penumbra.zone',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
    },
    staging: {
        BASE_URL: 'https://explorer.penumbra.pklabs.me',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
    },
}

module.exports = environments[envName]
