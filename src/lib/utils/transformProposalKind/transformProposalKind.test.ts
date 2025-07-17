import { ProposalKind } from '@/lib/graphql/generated/types'
import { TransformedProposalKind } from '@/lib/types'
import transformProposalKind from './transformProposalKind'

describe('transformProposalKind', () => {
    describe('returns unknown', () => {
        test('when kind unknown', async () => {
            // @ts-expect-error
            expect(transformProposalKind('FOO_BAR')).toBe(
                TransformedProposalKind.Unknown
            )
        })

        test('when kind undefined', async () => {
            expect(transformProposalKind(undefined)).toBe(
                TransformedProposalKind.Unknown
            )
        })
    })

    test('returns transformed kind', async () => {
        expect(transformProposalKind(ProposalKind.CommunityPoolSpend)).toBe(
            TransformedProposalKind.CommunityPoolSpend
        )

        expect(transformProposalKind(ProposalKind.Emergency)).toBe(
            TransformedProposalKind.Emergency
        )

        expect(transformProposalKind(ProposalKind.FreezeIbcClient)).toBe(
            TransformedProposalKind.FreezeIbcClient
        )

        expect(transformProposalKind(ProposalKind.ParameterChange)).toBe(
            TransformedProposalKind.ParameterChange
        )

        expect(transformProposalKind(ProposalKind.Signaling)).toBe(
            TransformedProposalKind.Signaling
        )

        expect(transformProposalKind(ProposalKind.UnfreezeIbcClient)).toBe(
            TransformedProposalKind.UnfreezeIbcClient
        )

        expect(transformProposalKind(ProposalKind.UpgradePlan)).toBe(
            TransformedProposalKind.UpgradePlan
        )
    })
})
