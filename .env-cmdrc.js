const envName = process.env._ENV_NAME || 'dev'

const environments = {
    dev: {
        BASE_URL:
            'https://penumbra-explorer-dev-564694434950.europe-west4.run.app',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
    },
    prod: {
        BASE_URL:
            'https://penumbra-explorer-prod-564694434950.us-east4.run.app',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
    },
    staging: {
        BASE_URL:
            'https://penumbra-explorer-staging-564694434950.us-east4.run.app',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://pe.dev.galaxid.xyz/',
    },
}

module.exports = environments[envName]
