/* istanbul ignore file */
import { cacheExchange, Client, fetchExchange } from 'urql'

const createGraphqlClient = () => {
    // if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
    //     throw Error('Missing NEXT_PUBLIC_GRAPHQL_URL')
    // }

    return new Client({
        // TODO: Use env variable once implemented on CI/CD
        // url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        url: 'https://penumbra-explorer.buber.eepy.sh/',
        fetchOptions: {
            credentials: 'omit',
        },
        exchanges: [cacheExchange, fetchExchange],
        requestPolicy: 'network-only',
    })
}

export default createGraphqlClient
