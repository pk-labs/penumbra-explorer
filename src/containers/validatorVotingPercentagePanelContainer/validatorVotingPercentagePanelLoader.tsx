// istanbul ignore file
import { FC } from 'react'
import { getValidatorVotingPercentage } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorVotingPercentagePanelContainer'
import ValidatorVotingPercentagePanelUpdater from './validatorVotingPercentagePanelUpdater'

const ValidatorVotingPercentagePanelLoader: FC<Props> = async props => {
    const number = await getValidatorVotingPercentage(props.validatorId)

    return (
        <GraphqlClientProvider>
            <ValidatorVotingPercentagePanelUpdater
                {...props}
                number={number ?? 0}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorVotingPercentagePanelLoader
