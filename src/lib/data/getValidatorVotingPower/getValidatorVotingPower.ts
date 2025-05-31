import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorVotingPowerQuery,
    ValidatorVotingPowerQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorVotingPowerQuery } from '@/lib/graphql/queries'

const getValidatorVotingPower = async (
    id: string
): Promise<number | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            ValidatorVotingPowerQuery,
            ValidatorVotingPowerQueryVariables
        >(validatorVotingPowerQuery, { id })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.validatorDetails?.votingPower
}

export default getValidatorVotingPower
