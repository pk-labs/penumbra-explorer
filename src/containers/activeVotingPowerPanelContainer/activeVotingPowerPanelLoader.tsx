// istanbul ignore file
import { FC } from 'react'
import { getActiveVotingPower } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './activeVotingPowerPanelContainer'
import ActiveVotingPowerPanelUpdater from './activeVotingPowerPanelUpdater'

const ActiveVotingPowerPanelLoader: FC<Props> = async props => {
    const number = await getActiveVotingPower()

    return (
        <GraphqlClientProvider>
            <ActiveVotingPowerPanelUpdater number={number ?? 0} {...props} />
        </GraphqlClientProvider>
    )
}

export default ActiveVotingPowerPanelLoader
