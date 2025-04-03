import {
    BlockFragment,
    PartialBlockFragment,
    PartialTransactionFragment,
    TransactionFragment,
} from '@/lib/graphql/generated/types'

export interface TransformedBlockFragment
    extends Omit<BlockFragment, 'transactions'> {
    transactions: TransformedPartialTransactionFragment[]
}

export interface TransformedPartialBlockFragment extends PartialBlockFragment {
    timeAgo?: string
}

export interface TransformedTransactionFragment extends TransactionFragment {
    actionCount: number
    json?: Record<string, any>
    primaryAction?: ActionType
}

export interface TransformedPartialTransactionFragment
    extends PartialTransactionFragment {
    actionCount: number
    json?: Record<string, any>
    primaryAction?: ActionType
    timeAgo?: string
}

export enum ActionType {
    communityPoolDeposit = 'Community Pool Deposit',
    communityPoolOutput = 'Community Pool Output',
    communityPoolSpend = 'Community Pool Spend',
    delegate = 'Delegate',
    delegatorVote = 'Delegator Vote',
    dutchAuctionEnd = 'Dutch Auction End',
    dutchAuctionSchedule = 'Dutch Auction Schedule',
    dutchAuctionWithdraw = 'Dutch Auction Withdraw',
    ibcRelayAction = 'IBC Relay Action',
    ics20Withdrawal = 'Ics20 Withdrawal',
    internalTransfer = 'Internal Transfer',
    output = 'Output',
    positionClose = 'Position Close',
    positionOpen = 'Position Open',
    positionRewardClaim = 'Position Reward Claim',
    positionWithdraw = 'Position Withdraw',
    proposalDepositClaim = 'Proposal Deposit Claim',
    proposalSubmit = 'Proposal Submit',
    proposalWithdraw = 'Proposal Withdraw',
    receive = 'Receive',
    send = 'Send',
    spend = 'Spend',
    swap = 'Swap',
    swapClaim = 'Swap Claim',
    undelegate = 'Undelegate',
    undelegateClaim = 'Undelegate Claim',
    unknown = 'Unknown',
    unknownInternal = 'Unknown (Internal)',
    validatorDefinition = 'Validator Definition',
    validatorVote = 'Validator Vote',
}

export interface UmPrice {
    change: number
    price: number
}
