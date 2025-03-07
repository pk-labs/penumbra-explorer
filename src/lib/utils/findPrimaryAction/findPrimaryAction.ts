import { Transaction } from '@penumbra-zone/protobuf/penumbra/core/transaction/v1/transaction_pb'
import { ActionType } from '@/lib/types'

const findPrimaryAction = (transaction?: Transaction): ActionType => {
    if (!transaction) {
        return ActionType.unknown
    }

    const cases = new Set(
        transaction.body?.actions.map((a: any) => a.action.case)
    )

    if (cases.has('swap')) {
        return ActionType.swap
    } else if (cases.has('swapClaim')) {
        return ActionType.swapClaim
    } else if (cases.has('delegate')) {
        return ActionType.delegate
    } else if (cases.has('undelegate')) {
        return ActionType.undelegate
    } else if (cases.has('undelegateClaim')) {
        return ActionType.undelegateClaim
    } else if (cases.has('ics20Withdrawal')) {
        return ActionType.ics20Withdrawal
    } else if (cases.has('actionDutchAuctionSchedule')) {
        return ActionType.dutchAuctionSchedule
    } else if (cases.has('actionDutchAuctionEnd')) {
        return ActionType.dutchAuctionEnd
    } else if (cases.has('actionDutchAuctionWithdraw')) {
        return ActionType.dutchAuctionWithdraw
    } else if (cases.has('delegatorVote')) {
        return ActionType.delegatorVote
    } else if (cases.has('validatorVote')) {
        return ActionType.validatorVote
    } else if (cases.has('validatorDefinition')) {
        return ActionType.validatorDefinition
    } else if (cases.has('ibcRelayAction')) {
        return ActionType.ibcRelayAction
    } else if (cases.has('proposalSubmit')) {
        return ActionType.proposalSubmit
    } else if (cases.has('proposalWithdraw')) {
        return ActionType.proposalWithdraw
    } else if (cases.has('proposalDepositClaim')) {
        return ActionType.proposalDepositClaim
    } else if (cases.has('positionOpen')) {
        return ActionType.positionOpen
    } else if (cases.has('positionClose')) {
        return ActionType.positionClose
    } else if (cases.has('positionWithdraw')) {
        return ActionType.positionWithdraw
    } else if (cases.has('positionRewardClaim')) {
        return ActionType.positionRewardClaim
    } else if (cases.has('communityPoolSpend')) {
        return ActionType.communityPoolSpend
    } else if (cases.has('communityPoolDeposit')) {
        return ActionType.communityPoolDeposit
    } else if (cases.has('communityPoolOutput')) {
        return ActionType.communityPoolOutput
    }

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
            return ActionType.receive
        }
        // If we can see all spends and outputs, it's a transaction we created ...
        if (allSpendsVisible && allOutputsVisible) {
            // ... so it's either a send or an internal transfer, depending on
            // whether there's an output we don't control.
            if (isInternal) {
                return ActionType.internalTransfer
            } else {
                return ActionType.send
            }
        }
    }

    if (isInternal) {
        return ActionType.unknownInternal
    }

    return ActionType.unknown
}

export default findPrimaryAction
