import {
    BlockFragment,
    IbcStatsQuery,
    IbcStatus,
    PartialBlockFragment,
    PartialTransactionFragment,
    TransactionFragment,
    ValidatorBlocksQuery,
    ValidatorQuery,
    ValidatorsQuery,
} from '@/lib/graphql/generated/types'

export interface TransformedBlockFragment
    extends Pick<BlockFragment, 'height'> {
    rawJson?: object
    timestamp: number
    transactions: TransformedPartialTransactionFragment[]
}

export interface TransformedPartialBlockFragment
    extends Pick<PartialBlockFragment, 'height' | 'transactionsCount'> {
    initialTimeAgo: string
    timestamp: number
}

export interface TransformedTransactionFragment
    extends Pick<TransactionFragment, 'hash' | 'raw'> {
    actionCount: number
    blockHeight: number
    chainId: string
    fee: number
    memo: boolean
    primaryAction?: ActionType
    rawJson: object
    timestamp: number
}

export interface TransformedPartialTransactionFragment
    extends Pick<PartialTransactionFragment, 'hash' | 'raw'> {
    actionCount: number
    blockHeight: number
    initialTimeAgo: string
    primaryAction?: ActionType
    status: IbcStatus
    timestamp: number
}

export interface TransformedIbcStats
    extends Omit<
        NonNullable<IbcStatsQuery['ibcStats']>[number],
        'clientId' | 'lastUpdated'
    > {
    id: string
    initialTimeAgo: string
    timestamp: number
}

export interface TransformedValidator
    extends Omit<
        NonNullable<ValidatorQuery['validatorDetails']>,
        'bondingState' | 'id' | 'state'
    > {
    bonding: ValidatorBonding
    id: string
    status: ValidatorStatus
}

export interface TransformedPartialValidator
    extends Omit<
        NonNullable<
            ValidatorsQuery['validatorsHomepage']['validators']
        >[number],
        'bondingState' | 'firstSeenTime' | 'id' | 'state'
    > {
    activeSince?: string
    bonding: ValidatorBonding
    id: string
    status: ValidatorStatus
}

export type ValidatorBonding = 'Bonded' | 'Unbonded' | 'Unbonding'

export type ValidatorStatus =
    | 'Active'
    | 'Defined'
    | 'Disabled'
    | 'Inactive'
    | 'Jailed'
    | 'Tombstoned'
    | 'Unspecified'

export type ValidatorBlocks = NonNullable<
    ValidatorBlocksQuery['validatorDetails']
>['last300Blocks']

// TODO: Refactor value names to pascal case
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

export type StoredSearchResult =
    | { hash: string; type: 'transaction' }
    | { height: number; type: 'block' }
    | { id: string; name?: string; type: 'validator' }
    | { id: string; type: 'client' }
