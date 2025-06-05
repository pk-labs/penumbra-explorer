// istanbul ignore file
import { FC } from 'react'
import { getValidatorVotingPower } from '@/lib/data'
import { ValidatorState } from '@/lib/graphql/generated/types'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorVotingPowerPanelContainer'
import ValidatorVotingPowerPanelUpdater from './validatorVotingPowerPanelUpdater'

const ValidatorVotingPowerPanelLoader: FC<Props> = async props => {
    const validator = await getValidatorVotingPower(props.validatorId)
    const number = validator?.votingPower
    const active = validator?.state === ValidatorState.ValidatorStateEnumActive

    return (
        <GraphqlClientProvider>
            <ValidatorVotingPowerPanelUpdater
                {...props}
                active={active}
                number={number ?? 0}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorVotingPowerPanelLoader
