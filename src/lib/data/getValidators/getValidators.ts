import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorFilter,
    ValidatorsQuery,
    ValidatorsQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorsQuery } from '@/lib/graphql/queries'

const getValidators = async (
    filter?: ValidatorFilter
): Promise<undefined | ValidatorsQuery['validatorsHomepage']['validators']> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<ValidatorsQuery, ValidatorsQueryVariables>(validatorsQuery, {
            filter,
        })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.validatorsHomepage.validators.map(rawValidator => {
        const { firstSeenTime, ...validator } = rawValidator

        return {
            ...validator,
            firstSeenTime:
                typeof firstSeenTime === 'string'
                    ? dayjs().to(firstSeenTime)
                    : undefined,
        }
    })
}

export default getValidators
