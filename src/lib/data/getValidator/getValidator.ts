import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorQuery,
    ValidatorQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorQuery } from '@/lib/graphql/queries'

const getValidator = async (
    id: string
): Promise<ValidatorQuery['validatorDetails']> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<ValidatorQuery, ValidatorQueryVariables>(validatorQuery, { id })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.validatorDetails
}

export default getValidator
