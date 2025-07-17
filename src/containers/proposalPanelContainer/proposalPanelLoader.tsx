// istanbul ignore file
import { FC } from 'react'
import { getActiveProposals, getLatestBlockHeight } from '@/lib/data'
import ProposalPanel from './proposalPanel'
import { Props } from './proposalPanelContainer'

const ProposalPanelLoader: FC<Props> = async props => {
    const [latestBlockHeight, proposals] = await Promise.all([
        getLatestBlockHeight(),
        getActiveProposals(),
    ])

    if (!latestBlockHeight || !proposals?.length) {
        return
    }

    const [proposal] = proposals

    return (
        <ProposalPanel
            className={props.className}
            latestBlockHeight={latestBlockHeight}
            proposal={proposal}
        />
    )
}

export default ProposalPanelLoader
