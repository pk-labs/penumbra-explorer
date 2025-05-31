import dayjs from 'dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorActiveSinceQuery,
    ValidatorActiveSinceQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorActiveSinceQuery } from '@/lib/graphql/queries'

const getValidatorActiveSince = async (
    id: string
): Promise<number | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            ValidatorActiveSinceQuery,
            ValidatorActiveSinceQueryVariables
        >(validatorActiveSinceQuery, { id })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.validatorDetails?.activeSince) {
        return
    }

    return dayjs().diff(result.data.validatorDetails.activeSince, 'days')
}

export default getValidatorActiveSince
