// istanbul ignore file
import { createClient as createWsClient } from 'graphql-ws'
import {
    cacheExchange,
    Client,
    fetchExchange,
    subscriptionExchange,
} from 'urql'

const createGraphqlClient = () => {
    const host = process.env.NEXT_PUBLIC_GRAPHQL_HOST

    if (!host) {
        throw Error('Missing NEXT_PUBLIC_GRAPHQL_HOST')
    }

    const wsClient = createWsClient({
        url: `wss://${host}/graphql/ws`,
    })

    return new Client({
        exchanges: [
            cacheExchange,
            fetchExchange,
            subscriptionExchange({
                forwardSubscription: request => {
                    const input = { ...request, query: request.query ?? '' }

                    return {
                        subscribe(sink) {
                            const dispose = wsClient.subscribe(input, sink)

                            return {
                                unsubscribe: dispose,
                            }
                        },
                    }
                },
            }),
        ],
        fetchOptions: {
            credentials: 'omit',
            signal: AbortSignal.timeout(10000),
        },
        requestPolicy: 'network-only',
        url: `https://${host}/graphql`,
    })
}

export default createGraphqlClient
