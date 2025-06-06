import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorBlocksQuery,
    ValidatorBlocksQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorBlocksQuery } from '@/lib/graphql/queries'
import { ValidatorBlock } from '@/lib/types'

const getValidatorBlocks = async (
    id: string
): Promise<undefined | ValidatorBlock[]> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            ValidatorBlocksQuery,
            ValidatorBlocksQueryVariables
        >(validatorBlocksQuery, { id })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.validatorDetails?.last300Blocks
}

export default getValidatorBlocks
