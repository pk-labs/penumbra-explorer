import {
    ActiveProposal,
    BlockFragment,
    DexLiquidityPositionsQuery,
    IbcStatsQuery,
    IbcStatus,
    PartialBlockFragment,
    PartialTransactionFragment,
    PastProposal,
    ProposalDetail,
    TransactionFragment,
    VoteValue,
} from '@/lib/graphql/generated/types'

export enum ActionType {
    CommunityPoolDeposit = 'Community pool deposit',
    CommunityPoolOutput = 'Community pool output',
    CommunityPoolSpend = 'Community pool spend',
    Delegate = 'Delegate',
    DelegatorVote = 'Delegator vote',
    DutchAuctionEnd = 'Dutch auction end',
    DutchAuctionSchedule = 'Dutch auction schedule',
    DutchAuctionWithdraw = 'Dutch auction withdraw',
    IbcRelayAction = 'IBC relay',
    Ics20Withdrawal = 'ICS 20 withdrawal',
    InternalTransfer = 'Internal transfer',
    LiquidityTournamentVote = 'Liquidity tournament vote',
    Output = 'Output',
    PositionClose = 'Position close',
    PositionOpen = 'Position open',
    PositionRewardClaim = 'Position reward claim',
    PositionWithdraw = 'Position withdraw',
    ProposalDepositClaim = 'Proposal deposit claim',
    ProposalSubmit = 'Proposal submit',
    ProposalWithdraw = 'Proposal withdraw',
    Receive = 'Receive',
    Send = 'Send',
    Spend = 'Spend',
    Swap = 'Swap',
    SwapClaim = 'Swap claim',
    Undelegate = 'Undelegate',
    UndelegateClaim = 'Undelegate claim',
    Unknown = 'Unknown',
    UnknownInternal = 'Unknown (internal)',
    ValidatorDefinition = 'Validator definition',
    ValidatorVote = 'Validator vote',
}

export interface UmPriceData {
    change: null | number
    price: null | number
}

export type StoredSearchResult =
    | { hash: string; type: 'transaction' }
    | { height: number; type: 'block' }
    | { id: string; name?: string; type: 'validator' }
    | { id: string; type: 'client' }

export interface TransformedBlockFragment
    extends Pick<BlockFragment, 'height'> {
    rawJson?: object
    timestamp: number
    transactions: TransformedPartialTransactionFragment[]
}

export interface TransformedPartialBlockFragment
    extends Pick<PartialBlockFragment, 'height' | 'transactionsCount'> {
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
    timestamp: number
}

export interface ValidatorBlock {
    height: number
    signed?: boolean
}

export interface TransformedDexBlockExecution {
    height: number
    swapExecutions: TransformedDexSwapExecution[]
    timestamp: number
}

export interface TransformedDexSwapExecution {
    arb?: boolean
    baseAmount: number
    baseAssetId: string
    id: number
    quoteAmount: number
    quoteAssetId: string
    routes: DexExecutionRoute[]
}

type DexExecutionRoute = DexExecutionHop[]

export interface DexExecutionHop {
    amount: number
    assetId: string
}

export interface TransformedDexPosition
    extends Pick<
        DexLiquidityPositionsQuery['liquidityPositions']['items'][number],
        'state'
    > {
    baseAssetId: string
    baseReserve: number
    fee: number
    id: string
    quoteAssetId: string
    quoteReserve: number
    timestamp: number
}

export interface TransformedActiveProposal
    extends Omit<ActiveProposal, 'kind'> {
    kind: TransformedProposalKind
}

export interface TransformedPastProposal
    extends Omit<PastProposal, 'endTimestamp' | 'kind'> {
    endTimestamp: number
    kind: TransformedProposalKind
}

export interface TransformedProposal
    extends Pick<
        ProposalDetail,
        'depositAmount' | 'description' | 'id' | 'outcome' | 'state' | 'title'
    > {
    kind: TransformedProposalKind
    rawJson?: object
}

export enum TransformedProposalKind {
    CommunityPoolSpend = 'Community pool spend',
    Emergency = 'Emergency',
    FreezeIbcClient = 'Freeze IBC client',
    ParameterChange = 'Parameter change',
    Signaling = 'Signaling',
    UnfreezeIbcClient = 'Unfreeze IBC client',
    Unknown = 'Unknown',
    UpgradePlan = 'Upgrade plan',
}

export interface VotingStart {
    blockHeight: number
    timestamp: number
}

export interface VotingEnd {
    endBlockHeight: number
    timestamp: number
    votingInProgress: boolean
}

export interface TransformedVoting {
    abstain: number
    abstainPercentage: number
    no: number
    noPercentage: number
    quorum: number
    state?: VotingState
    total: number
    yes: number
    yesPercentage: number
}

export enum VotingState {
    Failed = 'Failed',
    InProgress = 'Voting in progress',
    Passed = 'Passed',
    Slashed = 'Slashed',
}

export interface TransformedVote {
    id?: null | string
    name?: string
    power: number
    powerPercentage: number
    timestamp: number
    transactionHash: string
    value: VoteValue
}
