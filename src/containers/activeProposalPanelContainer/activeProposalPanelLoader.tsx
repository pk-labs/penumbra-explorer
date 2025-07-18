// istanbul ignore file
import { FC } from 'react'
import { getActiveProposals, getLatestBlockHeight } from '@/lib/data'
import ActiveProposalPanel from './activeProposalPanel'
import { Props } from './activeProposalPanelContainer'

const ActiveProposalPanelLoader: FC<Props> = async props => {
    const [latestBlockHeight, proposals] = await Promise.all([
        getLatestBlockHeight(),
        getActiveProposals(),
    ])

    if (!latestBlockHeight || !proposals?.length) {
        return
    }

    const [proposal] = proposals

    return (
        <ActiveProposalPanel
            className={props.className}
            latestBlockHeight={latestBlockHeight}
            proposal={proposal}
        />
    )
}

export default ActiveProposalPanelLoader
