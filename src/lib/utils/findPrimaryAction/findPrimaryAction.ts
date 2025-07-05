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
    } else if (cases.has('spend')) {
        return ActionType.Spend
    } else if (cases.has('output')) {
        return ActionType.Output
    }

    /*
    const hasOpaqueSpend = false
    const allSpendsVisible = !hasOpaqueSpend

    const hasOpaqueOutput = false
    const allOutputsVisible = !hasOpaqueOutput

    // A visible output whose note is controlled by an opaque address is an
    // output we don't control.
    const hasVisibleOutputWithOpaqueAddress = false

    // A visible output whose note is controlled by an opaque address is an
    // output we do control.
    const hasVisibleOutputWithVisibleAddress = false

    // A transaction is internal if all spends and outputs are visible, and
    // there are no outputs we don't control.
    const isInternal =
        allSpendsVisible &&
        allOutputsVisible &&
        !hasVisibleOutputWithOpaqueAddress

    // Call a transaction a "transfer" if it only has spends and outputs.
    const isTransfer = transaction.body?.actions.every(
        (a: any) => a.action.case === 'spend' || a.action.case === 'output'
    )

    // If the tx has only spends and outputs, then it's a transfer. What kind?
    if (isTransfer) {
        // If we can't see at least one spend, but we can see an output we
        // control, it's a receive.
        if (hasOpaqueSpend && hasVisibleOutputWithVisibleAddress) {
            return ActionType.Receive
        }
        // If we can see all spends and outputs, it's a transaction we created ...
        if (allSpendsVisible && allOutputsVisible) {
            // ... so it's either a send or an internal transfer, depending on
            // whether there's an output we don't control.
            if (isInternal) {
                return ActionType.InternalTransfer
            } else {
                return ActionType.Send
            }
        }
    }

    if (isInternal) {
        return ActionType.UnknownInternal
    }
    */

    return ActionType.Unknown
}

export default findPrimaryAction
