import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    CollectionLimit,
    DexLiquidityPositionsQuery,
    DexLiquidityPositionsQueryVariables,
    LiquidityPositionFilter,
} from '@/lib/graphql/generated/types'
import { dexLiquidityPositionsQuery } from '@/lib/graphql/queries'
import { TransformedDexPosition } from '@/lib/types'

const getDexLiquidityPositions = async (
    limit: CollectionLimit,
    filter?: LiquidityPositionFilter
): Promise<{
    positions: TransformedDexPosition[]
    total: number
}> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            DexLiquidityPositionsQuery,
            DexLiquidityPositionsQueryVariables
        >(dexLiquidityPositionsQuery, { filter, limit })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data) {
        return { positions: [], total: 0 }
    }

    const positions = result.data.liquidityPositions.items.map(position => ({
        baseAssetId: position.tradingPairAsset1,
        baseReserve: Number(position.reserves1Amount),
        fee: position.feePercentage,
        id: position.positionId,
        quoteAssetId: position.tradingPairAsset2,
        quoteReserve: Number(position.reserves2Amount),
        state: position.state,
        timestamp: dayjs(position.updatedAt).valueOf(),
    }))

    return { positions, total: result.data.liquidityPositions.total }
}

export default getDexLiquidityPositions
