import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    IbcChannelPairsQuery,
    IbcChannelPairsQueryVariables,
} from '@/lib/graphql/generated/types'
import { ibcChannelPairsQuery } from '@/lib/graphql/queries'

interface IbcChannelPairData {
    channelId: string
    counterpartyChannelId: string
}

const getIbcChannelPair = async (
    clientId: string
): Promise<IbcChannelPairData | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            IbcChannelPairsQuery,
            IbcChannelPairsQueryVariables
        >(ibcChannelPairsQuery, { clientId })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.ibcChannelPairsByClientId.length) {
        return
    }

    const [pair] = result.data.ibcChannelPairsByClientId

    if (!pair.counterpartyChannelId) {
        return
    }

    return {
        channelId: pair.channelId,
        counterpartyChannelId: pair.counterpartyChannelId,
    }
}

export default getIbcChannelPair
