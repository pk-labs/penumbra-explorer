import {
    PartialBlockFragment,
    PartialTransactionFragment,
    TransactionFragment,
} from '@/lib/graphql/generated/types'

export interface TransformedPartialBlockFragment extends PartialBlockFragment {
    timeAgo?: string
}

export interface TransformedTransactionFragment extends TransactionFragment {
    json?: Record<string, any>
    primaryAction?: ActionType
}

export interface TransformedPartialTransactionFragment
    extends PartialTransactionFragment {
    json?: Record<string, any>
    primaryAction?: ActionType
    timeAgo?: string
}

export enum ActionType {
    // We don't know what kind of transaction this is, or it's undefined.
    communityPoolDeposit = 'Community Pool Deposit',
    // We know that it's internal (e.g, a swap), but nothing more.
    communityPoolOutput = 'Community Pool Output',
    // The transaction is an internal transfer between the user's accounts.
    communityPoolSpend = 'Community Pool Spend',
    // The transaction is a send to an external account.
    delegate = 'Delegate',
    // The transaction is a receive from an external account.
    delegatorVote = 'Delegator Vote',
    // The transactions below are one that contain the respective action.
    dutchAuctionEnd = 'Dutch Auction End',
    dutchAuctionSchedule = 'Dutch Auction Schedule',
    dutchAuctionWithdraw = 'Dutch Auction Withdraw',
    ibcRelayAction = 'IBC Relay Action',
    ics20Withdrawal = 'Ics20 Withdrawal',
    internalTransfer = 'Internal Transfer',
    positionClose = 'Position Close',
    positionOpen = 'Position Open',
    positionRewardClaim = 'Position Reward Claim',
    positionWithdraw = 'Position Withdraw',
    proposalDepositClaim = 'Proposal Deposit Claim',
    proposalSubmit = 'Proposal Submit',
    proposalWithdraw = 'Proposal Withdraw',
    receive = 'Receive',
    send = 'Send',
    swap = 'Swap',
    swapClaim = 'Swap Claim',
    undelegate = 'Undelegate',
    undelegateClaim = 'Undelegate Claim',
    unknown = 'Unknown',
    unknownInternal = 'Unknown (Internal)',
    validatorDefinition = 'Validator Definition',
    validatorVote = 'Validator Vote',
}
