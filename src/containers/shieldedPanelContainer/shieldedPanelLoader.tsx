// istanbul ignore file
import { FC } from 'react'
import { getTotalShieldedVolume } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './shieldedPanelContainer'
import ShieldedPanelUpdater from './shieldedPanelUpdater'

const ShieldedPanelLoader: FC<Props> = async props => {
    const volume = await getTotalShieldedVolume()

    return (
        <GraphqlClientProvider>
            <ShieldedPanelUpdater number={volume ?? 0} {...props} />
        </GraphqlClientProvider>
    )
}

export default ShieldedPanelLoader
