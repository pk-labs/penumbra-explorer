import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    MinValidatorStakeQuery,
    MinValidatorStakeQueryVariables,
} from '@/lib/graphql/generated/types'
import { minValidatorStakeQuery } from '@/lib/graphql/queries'

const getMinValidatorStake = async (): Promise<number | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            MinValidatorStakeQuery,
            MinValidatorStakeQueryVariables
        >(minValidatorStakeQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    // TODO: Remove parsing once receiving raw number
    const preformatted =
        result.data?.validatorsHomepage.stakingParameters.minValidatorStake

    return preformatted ? Number(preformatted.split(' ')[0]) : undefined
}

export default getMinValidatorStake
