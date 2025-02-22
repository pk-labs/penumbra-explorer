/* istanbul ignore file */
import { cacheExchange, Client, fetchExchange } from 'urql'

const createGraphqlClient = () => {
    if (!process.env.GRAPHQL_URL) {
        throw Error('Missing GRAPHQL_URL')
    }

    return new Client({
        url: process.env.GRAPHQL_URL,
        fetchOptions: {
            credentials: 'omit',
        },
        exchanges: [cacheExchange, fetchExchange],
        requestPolicy: 'network-only',
    })
}

export default createGraphqlClient
