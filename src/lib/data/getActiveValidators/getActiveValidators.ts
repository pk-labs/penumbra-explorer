import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ActiveValidatorsQuery,
    ActiveValidatorsQueryVariables,
} from '@/lib/graphql/generated/types'
import { activeValidatorsQuery } from '@/lib/graphql/queries'

const getActiveValidators = async (): Promise<
    ActiveValidatorsQuery['validatorsHomepage']['stakingParameters'] | undefined
> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            ActiveValidatorsQuery,
            ActiveValidatorsQueryVariables
        >(activeValidatorsQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.validatorsHomepage.stakingParameters
}

export default getActiveValidators
