import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorParametersQuery,
    ValidatorParametersQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorParametersQuery } from '@/lib/graphql/queries'

const getValidatorParameters = async (): Promise<
    | undefined
    | ValidatorParametersQuery['validatorsHomepage']['stakingParameters']
> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            ValidatorParametersQuery,
            ValidatorParametersQueryVariables
        >(validatorParametersQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.validatorsHomepage.stakingParameters
}

export default getValidatorParameters
