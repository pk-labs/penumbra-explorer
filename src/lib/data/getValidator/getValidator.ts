/* eslint-disable @typescript-eslint/ban-ts-comment */
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorQuery,
    ValidatorQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorQuery } from '@/lib/graphql/queries'
import { TransformedValidator } from '@/lib/types'

const validatorStatusTransformer = {
    VALIDATOR_STATE_ENUM_ACTIVE: 'Active',
    VALIDATOR_STATE_ENUM_DEFINED: 'Defined',
    VALIDATOR_STATE_ENUM_DISABLED: 'Disabled',
    VALIDATOR_STATE_ENUM_INACTIVE: 'Inactive',
    VALIDATOR_STATE_ENUM_JAILED: 'Jailed',
    VALIDATOR_STATE_ENUM_TOMBSTONED: 'Tombstoned',
    VALIDATOR_STATE_ENUM_UNSPECIFIED: 'Unspecified',
}

const validatorBondingTransformer = {
    BONDING_STATE_ENUM_BONDED: 'Bonded',
    BONDING_STATE_ENUM_UNBONDED: 'Unbonded',
    BONDING_STATE_ENUM_UNBONDING: 'Unbdonding',
}

const getValidator = async (
    id: string
): Promise<TransformedValidator | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<ValidatorQuery, ValidatorQueryVariables>(validatorQuery, { id })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.validatorDetails) {
        return
    }

    // TODO: Use enums from GraphQL
    const { bondingState, state, ...validator } = result.data.validatorDetails

    return {
        ...validator,
        bonding: bondingState
            ? // @ts-ignore
              validatorBondingTransformer[bondingState]
            : 'Unbonded',
        // @ts-ignore
        status: state ? validatorStatusTransformer[state] : 'Unspecified',
    }
}

export default getValidator
