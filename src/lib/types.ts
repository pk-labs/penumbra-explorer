import {
    BlockFragment,
    BlockUpdate,
    PartialBlockFragment,
    PartialTransactionFragment,
    TransactionFragment,
    TransactionUpdate,
} from '@/lib/graphql/generated/types'

export interface TransformedBlockFragment
    extends Omit<BlockFragment, 'rawJson' | 'transactions'> {
    rawJson?: object
    transactions: TransformedPartialTransactionFragment[]
}

export interface TransformedPartialBlockFragment extends PartialBlockFragment {
    timeAgo?: string
}

export interface TransformedBlockUpdate extends BlockUpdate {
    timeAgo?: string
}

export interface TransformedTransactionFragment
    extends Omit<TransactionFragment, 'rawJson'> {
    actionCount: number
    memo: boolean
    primaryAction?: ActionType
    rawJson: object
}

export interface TransformedPartialTransactionFragment
    extends PartialTransactionFragment {
    actionCount: number
    primaryAction?: ActionType
    timeAgo?: string
}

export interface TransformedTransactionUpdate
    extends Omit<TransactionUpdate, 'id'> {
    actionCount: number
    block: {
        height: number
    }
    primaryAction?: ActionType
    timeAgo?: string
}

export enum ActionType {
    communityPoolDeposit = 'Community pool deposit',
    communityPoolOutput = 'Community pool output',
    communityPoolSpend = 'Community pool spend',
    delegate = 'Delegate',
    delegatorVote = 'Delegator vote',
    dutchAuctionEnd = 'Dutch auction end',
    dutchAuctionSchedule = 'Dutch auction schedule',
    dutchAuctionWithdraw = 'Dutch auction withdraw',
    ibcRelayAction = 'IBC relay',
    ics20Withdrawal = 'ICS 20 withdrawal',
    internalTransfer = 'Internal transfer',
    output = 'Output',
    positionClose = 'Position close',
    positionOpen = 'Position open',
    positionRewardClaim = 'Position reward claim',
    positionWithdraw = 'Position withdraw',
    proposalDepositClaim = 'Proposal deposit claim',
    proposalSubmit = 'Proposal submit',
    proposalWithdraw = 'Proposal withdraw',
    receive = 'Receive',
    send = 'Send',
    spend = 'Spend',
    swap = 'Swap',
    swapClaim = 'Swap claim',
    undelegate = 'Undelegate',
    undelegateClaim = 'Undelegate claim',
    unknown = 'Unknown',
    unknownInternal = 'Unknown (internal)',
    validatorDefinition = 'Validator definition',
    validatorVote = 'Validator vote',
}

export interface UmPriceData {
    change: number
    price: number
}
