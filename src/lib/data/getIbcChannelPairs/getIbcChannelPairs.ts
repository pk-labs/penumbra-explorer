import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    IbcChannelPairsQuery,
    IbcChannelPairsQueryVariables,
} from '@/lib/graphql/generated/types'
import { ibcChannelPairsQuery } from '@/lib/graphql/queries'

type IbcChannelPairs = Array<{
    channelId: string
    counterpartyChannelId: string
}>

const getIbcChannelPairs = async (
    clientId: string
): Promise<IbcChannelPairs | undefined> => {
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
    ) as IbcChannelPairs
}

export default getIbcChannelPairs
