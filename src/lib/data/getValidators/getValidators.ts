/* eslint-disable @typescript-eslint/ban-ts-comment */
import dayjs from '@/lib/dayjs'
import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorFilter,
    ValidatorsQuery,
    ValidatorsQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorsQuery } from '@/lib/graphql/queries'
import { TransformedPartialValidator } from '@/lib/types'

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
): Promise<TransformedPartialValidator[] | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<ValidatorsQuery, ValidatorsQueryVariables>(validatorsQuery, {
            filter,
        })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    // TODO: Use enums from GraphQL
    // @ts-ignore
    return result.data?.validatorsHomepage.validators.map(rawValidator => {
        const { bondingState, firstSeenTime, state, ...validator } =
            rawValidator

        return {
            ...validator,
            activeSince:
                typeof firstSeenTime === 'string'
                    ? dayjs().to(firstSeenTime)
                    : undefined,
            bonding: bondingState
                ? // @ts-ignore
                  validatorBondingTransformer[bondingState]
                : 'Unbonded',
            status: state ? validatorStatusTransformer[state] : 'Unspecified',
        }
    })
}

export default getValidators
