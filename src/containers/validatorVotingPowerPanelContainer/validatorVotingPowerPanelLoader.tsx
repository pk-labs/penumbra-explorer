// istanbul ignore file
import { FC } from 'react'
import { getValidatorVotingPower } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorVotingPowerPanelContainer'
import ValidatorVotingPowerPanelUpdater from './validatorVotingPowerPanelUpdater'

const ValidatorVotingPowerPanelLoader: FC<Props> = async props => {
    const number = await getValidatorVotingPower(props.validatorId)

    return (
        <GraphqlClientProvider>
            <ValidatorVotingPowerPanelUpdater {...props} number={number ?? 0} />
        </GraphqlClientProvider>
    )
}

export default ValidatorVotingPowerPanelLoader
