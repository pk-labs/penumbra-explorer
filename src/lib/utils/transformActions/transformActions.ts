// istanbul ignore file
import { Transaction } from '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb'
import { ActionType } from '@/lib/types'

const transformActions = (
    actions?: NonNullable<Transaction['body']>['actions']
): ActionType[] | undefined =>
    actions?.map(({ action }) => {
        switch (action.case) {
            case 'actionDutchAuctionEnd':
                return ActionType.dutchAuctionEnd
            case 'actionDutchAuctionSchedule':
                return ActionType.dutchAuctionSchedule
            case 'actionDutchAuctionWithdraw':
                return ActionType.dutchAuctionWithdraw
            case 'actionLiquidityTournamentVote':
                return ActionType.unknown
        }

        return action.case ? ActionType[action.case] : ActionType.unknown
    })

export default transformActions
