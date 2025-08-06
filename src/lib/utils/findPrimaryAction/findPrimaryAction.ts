// istanbul ignore file
import { Transaction } from '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb'
import { ActionType } from '@/lib/types'

const findPrimaryAction = (transaction?: Transaction): ActionType => {
    if (!transaction) {
        return ActionType.Unknown
    }

    const cases = new Set(transaction.body?.actions.map(a => a.action.case))

    if (cases.has('swap')) {
        return ActionType.Swap
    } else if (cases.has('swapClaim')) {
        return ActionType.SwapClaim
    } else if (cases.has('delegate')) {
        return ActionType.Delegate
    } else if (cases.has('undelegate')) {
        return ActionType.Undelegate
    } else if (cases.has('undelegateClaim')) {
        return ActionType.UndelegateClaim
    } else if (cases.has('ics20Withdrawal')) {
        return ActionType.Ics20Withdrawal
    } else if (cases.has('actionDutchAuctionSchedule')) {
        return ActionType.DutchAuctionSchedule
    } else if (cases.has('actionDutchAuctionEnd')) {
        return ActionType.DutchAuctionEnd
    } else if (cases.has('actionDutchAuctionWithdraw')) {
        return ActionType.DutchAuctionWithdraw
    } else if (cases.has('delegatorVote')) {
        return ActionType.DelegatorVote
    } else if (cases.has('validatorVote')) {
        return ActionType.ValidatorVote
    } else if (cases.has('validatorDefinition')) {
        return ActionType.ValidatorDefinition
    } else if (cases.has('ibcRelayAction')) {
        return ActionType.IbcRelayAction
    } else if (cases.has('proposalSubmit')) {
        return ActionType.ProposalSubmit
    } else if (cases.has('proposalWithdraw')) {
        return ActionType.ProposalWithdraw
    } else if (cases.has('proposalDepositClaim')) {
        return ActionType.ProposalDepositClaim
    } else if (cases.has('positionOpen')) {
        return ActionType.PositionOpen
    } else if (cases.has('positionClose')) {
        return ActionType.PositionClose
    } else if (cases.has('positionWithdraw')) {
        return ActionType.PositionWithdraw
    } else if (cases.has('positionRewardClaim')) {
        return ActionType.PositionRewardClaim
    } else if (cases.has('communityPoolSpend')) {
        return ActionType.CommunityPoolSpend
    } else if (cases.has('communityPoolDeposit')) {
        return ActionType.CommunityPoolDeposit
    } else if (cases.has('communityPoolOutput')) {
        return ActionType.CommunityPoolOutput
    } else if (cases.has('actionLiquidityTournamentVote')) {
        return ActionType.LiquidityTournamentVote
    } else if (cases.has('spend')) {
        return ActionType.Spend
    } else if (cases.has('output')) {
        return ActionType.Output
    }

    return ActionType.Unknown
}

export default findPrimaryAction
