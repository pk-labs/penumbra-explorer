/* istanbul ignore file */
import { cacheExchange, Client, fetchExchange } from 'urql'

const createGraphqlClient = () => {
    if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
        throw Error('Missing NEXT_PUBLIC_GRAPHQL_URL')
    }

    return new Client({
        exchanges: [cacheExchange, fetchExchange],
        fetchOptions: {
            credentials: 'omit',
        },
        requestPolicy: 'network-only',
        url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    })
}

export default createGraphqlClient
