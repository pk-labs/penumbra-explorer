import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    DexBlockExecutionsQuery,
    DexBlockExecutionsQueryVariables,
    SwapExecutionFilter,
} from '@/lib/graphql/generated/types'
import { dexBlockExecutionsQuery } from '@/lib/graphql/queries'
import { TransformedDexBlockExecution } from '@/lib/types'

const getDexBlockExecutions = async (
    filter?: SwapExecutionFilter
): Promise<TransformedDexBlockExecution[] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            DexBlockExecutionsQuery,
            DexBlockExecutionsQueryVariables
        >(dexBlockExecutionsQuery, { filter })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.latestExecutions.map(blockExecution => {
        return {
            height: blockExecution.blockHeight,
            swapExecutions: blockExecution.batchSwaps.map(swap => ({
                baseAmount: Number(swap.totalInputAmount),
                baseAssetId: swap.totalInputAssetId,
                id: swap.id,
                quoteAmount: Number(swap.totalOutputAmount),
                quoteAssetId: swap.totalOutputAssetId,
                routes: swap.individualSwaps.map(route =>
                    route.routeSteps.map(hop => ({
                        amount: Number(hop.amount),
                        assetId: hop.assetId,
                    }))
                ),
            })),
            timestamp: dayjs(blockExecution.timestamp).valueOf(),
        }
    })
}

export default getDexBlockExecutions
