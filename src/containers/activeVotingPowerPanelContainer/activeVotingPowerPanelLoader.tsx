// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { getActiveVotingPower } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './activeVotingPowerPanelContainer'
import ActiveVotingPowerPanelUpdater from './activeVotingPowerPanelUpdater'

const ActiveVotingPowerPanelLoader: FC<Props> = async props => {
    const number = await getActiveVotingPower()

    if (typeof number === 'undefined') {
        notFound()
    }

    return (
        <GraphqlClientProvider>
            <ActiveVotingPowerPanelUpdater number={number} {...props} />
        </GraphqlClientProvider>
    )
}

export default ActiveVotingPowerPanelLoader
