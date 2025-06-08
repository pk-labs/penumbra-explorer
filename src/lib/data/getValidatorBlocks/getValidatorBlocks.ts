import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorBlocksQuery,
    ValidatorBlocksQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorBlocksQuery } from '@/lib/graphql/queries'

const getValidatorBlocks = async (
    id: string
): Promise<ValidatorBlocksQuery['validatorDetails']> => {
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

    return result.data?.validatorDetails
}

export default getValidatorBlocks
