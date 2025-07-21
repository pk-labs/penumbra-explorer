import { ProposalKind } from '@/lib/graphql/generated/types'
import { TransformedProposalKind } from '@/lib/types'

const transformProposalKind = (
    kind?: ProposalKind
): TransformedProposalKind => {
    switch (kind) {
        case ProposalKind.CommunityPoolSpend:
            return TransformedProposalKind.CommunityPoolSpend
        case ProposalKind.Emergency:
            return TransformedProposalKind.Emergency
        case ProposalKind.FreezeIbcClient:
            return TransformedProposalKind.FreezeIbcClient
        case ProposalKind.ParameterChange:
            return TransformedProposalKind.ParameterChange
        case ProposalKind.Signaling:
            return TransformedProposalKind.Signaling
        case ProposalKind.UnfreezeIbcClient:
            return TransformedProposalKind.UnfreezeIbcClient
        case ProposalKind.UpgradePlan:
            return TransformedProposalKind.UpgradePlan
        default:
            return TransformedProposalKind.Unknown
    }
}

export default transformProposalKind
