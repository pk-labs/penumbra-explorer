/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ActionType } from '@/lib/types'
import transformActions from './transformActions'

describe('transformActions', () => {
    test('returns undefined if actions undefined', async () => {
        expect(transformActions(undefined)).toBeUndefined()
    })

    test('returns array of action types', async () => {
        expect(
            transformActions([
                // @ts-ignore
                { action: { case: 'delegate' } },
                // @ts-ignore
                { action: { case: 'spend' } },
            ])
        ).toMatchObject([ActionType.delegate, ActionType.spend])
    })

    test('maps missing case to unknown', async () => {
        expect(
            transformActions([
                // @ts-ignore
                { action: { case: '' } },
                // @ts-ignore
                { action: { case: null } },
            ])
        ).toMatchObject([ActionType.unknown, ActionType.unknown])
    })

    test('maps cases prefixed with action', async () => {
        expect(
            transformActions([
                // @ts-ignore
                { action: { case: 'actionDutchAuctionEnd' } },
                // @ts-ignore
                { action: { case: 'actionDutchAuctionSchedule' } },
                // @ts-ignore
                { action: { case: 'actionDutchAuctionWithdraw' } },
                // @ts-ignore
                { action: { case: 'actionLiquidityTournamentVote' } },
            ])
        ).toMatchObject([
            ActionType.dutchAuctionEnd,
            ActionType.dutchAuctionSchedule,
            ActionType.dutchAuctionWithdraw,
            ActionType.unknown,
        ])
    })
})
