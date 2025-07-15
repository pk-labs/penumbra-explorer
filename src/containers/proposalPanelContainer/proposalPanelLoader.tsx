// istanbul ignore file
import { FC } from 'react'
import { getActiveProposals } from '@/lib/data'
import ProposalPanel from './proposalPanel'
import { Props } from './proposalPanelContainer'

const ProposalPanelLoader: FC<Props> = async props => {
    const proposals = await getActiveProposals()

    if (!proposals?.length) {
        return
    }

    const [proposal] = proposals

    return <ProposalPanel className={props.className} proposal={proposal} />
}

export default ProposalPanelLoader
