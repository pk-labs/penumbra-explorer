import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    GovParametersQuery,
    GovParametersQueryVariables,
} from '@/lib/graphql/generated/types'
import { govParametersQuery } from '@/lib/graphql/queries'

const getGovParameters = async (): Promise<
    GovParametersQuery['governanceParameters'] | undefined
> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            GovParametersQuery,
            GovParametersQueryVariables
        >(govParametersQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.governanceParameters
}

export default getGovParameters
