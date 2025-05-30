/* eslint-disable @typescript-eslint/ban-ts-comment */
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorFilter,
    ValidatorsQuery,
    ValidatorsQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorsQuery } from '@/lib/graphql/queries'
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

const getValidators = async (
    filter?: ValidatorFilter
): Promise<TransformedValidator[] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<ValidatorsQuery, ValidatorsQueryVariables>(validatorsQuery, {
            filter,
        })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    // FIXME: Workaround for certain fields typed as undefined/null
    return result.data?.validatorsHomepage.validators.map(validator => ({
        bonding: validator.bondingState
            ? // @ts-ignore
              validatorBondingTransformer[validator.bondingState]
            : 'Unbonded',
        commission: validator.commission,
        firstSeenTime: validator.firstSeenTime,
        id: `${validator.id}`,
        name: validator.name ?? undefined,
        status: validator.state
            ? // @ts-ignore
              validatorStatusTransformer[validator.state]
            : 'Unspecified',
        uptime: validator.uptime,
        votingPower: validator.votingPower,
        votingPowerActivePercentage: validator.votingPowerActivePercentage,
    }))
}

export default getValidators
