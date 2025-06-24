import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    CollectionLimit,
    LiquidityPositionsQuery,
    LiquidityPositionsQueryVariables,
} from '@/lib/graphql/generated/types'
import { liquidityPositionsQuery } from '@/lib/graphql/queries'
import { TransformedDexPosition } from '@/lib/types'

const getLiquidityPositions = async (
    limit: CollectionLimit
): Promise<{
    positions: TransformedDexPosition[]
    total: number
}> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            LiquidityPositionsQuery,
            LiquidityPositionsQueryVariables
        >(liquidityPositionsQuery, { limit })
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

export default getLiquidityPositions
