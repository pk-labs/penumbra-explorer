import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    IbcChannelPairsQuery,
    IbcChannelPairsQueryVariables,
} from '@/lib/graphql/generated/types'
import { ibcChannelPairsQuery } from '@/lib/graphql/queries'
import { IbcChannelPair } from '@/lib/types'

const getIbcChannelPairs = async (
    clientId: string
): Promise<IbcChannelPair[] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            IbcChannelPairsQuery,
            IbcChannelPairsQueryVariables
        >(ibcChannelPairsQuery, { clientId })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.ibcChannelPairsByClientId.filter(
        pair => pair.channelId && pair.counterpartyChannelId
    ) as IbcChannelPair[]
}

export default getIbcChannelPairs
