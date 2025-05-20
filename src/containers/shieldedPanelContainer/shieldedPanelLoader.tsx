// istanbul ignore file
import { FC } from 'react'
import { getTotalShieldedVolume } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import ShieldedPanelUpdater from './shieldedPanelUpdater'

export interface Props {
    className?: string
    number?: number
}

const ShieldedPanelLoader: FC<Props> = async props => {
    const volume = await getTotalShieldedVolume()

    return (
        <GraphqlClientProvider>
            <ShieldedPanelUpdater initialNumber={volume} {...props} />
        </GraphqlClientProvider>
    )
}

export default ShieldedPanelLoader
