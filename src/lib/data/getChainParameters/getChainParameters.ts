import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ChainParametersQuery,
    ChainParametersQueryVariables,
} from '@/lib/graphql/generated/types'
import { chainParametersQuery } from '@/lib/graphql/queries'

const getChainParameters = async (): Promise<
    ChainParametersQuery['validatorsHomepage']['chainParameters'] | undefined
> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            ChainParametersQuery,
            ChainParametersQueryVariables
        >(chainParametersQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.validatorsHomepage.chainParameters
}

export default getChainParameters
