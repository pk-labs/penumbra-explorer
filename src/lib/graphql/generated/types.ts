import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Action = IbcRelay | NotYetSupportedAction | Output | Spend;

export type AssetId = {
  __typename?: 'AssetId';
  altBaseDenom: Scalars['String']['output'];
  altBech32M: Scalars['String']['output'];
  inner: Scalars['String']['output'];
};

export type BatchSwap = {
  __typename?: 'BatchSwap';
  executionType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  individualSwaps: Array<IndividualSwap>;
  individualSwapsCount: Scalars['Int']['output'];
  totalInputAmount: Scalars['String']['output'];
  totalInputAssetId: Scalars['String']['output'];
  totalOutputAmount: Scalars['String']['output'];
  totalOutputAssetId: Scalars['String']['output'];
};

export type Block = {
  __typename?: 'Block';
  chainId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  height: Scalars['Int']['output'];
  rawEvents: Array<Event>;
  rawJson: Scalars['JSON']['output'];
  transactions: Array<Transaction>;
  transactionsCount: Scalars['Int']['output'];
};

export type BlockCollection = {
  __typename?: 'BlockCollection';
  items: Array<Block>;
  total: Scalars['Int']['output'];
};

export type BlockFilter = {
  height?: InputMaybe<Scalars['Int']['input']>;
};

export type BlockParticipation = {
  __typename?: 'BlockParticipation';
  height: Scalars['Int']['output'];
  signed: Scalars['Boolean']['output'];
};

export type BlockUpdate = {
  __typename?: 'BlockUpdate';
  createdAt: Scalars['DateTime']['output'];
  height: Scalars['Int']['output'];
  transactionsCount: Scalars['Int']['output'];
};

export enum BondingState {
  BondingStateEnumBonded = 'BONDING_STATE_ENUM_BONDED',
  BondingStateEnumUnbonded = 'BONDING_STATE_ENUM_UNBONDED',
  BondingStateEnumUnbonding = 'BONDING_STATE_ENUM_UNBONDING',
  BondingStateEnumUnspecified = 'BONDING_STATE_ENUM_UNSPECIFIED'
}

export type ChainParameters = {
  __typename?: 'ChainParameters';
  chainId: Scalars['String']['output'];
  currentBlockHeight: Scalars['Int']['output'];
  currentBlockTime: Scalars['DateTime']['output'];
  currentEpoch: Scalars['Int']['output'];
  epochDuration: Scalars['Int']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  nextEpochIn: Scalars['Int']['output'];
};

export type ChainParametersUpdate = {
  __typename?: 'ChainParametersUpdate';
  chainId: Scalars['String']['output'];
  currentBlockHeight: Scalars['Int']['output'];
  currentBlockTime: Scalars['DateTime']['output'];
  currentEpoch: Scalars['Int']['output'];
  epochDuration: Scalars['Int']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  nextEpochIn: Scalars['Int']['output'];
};

export enum ClientStatus {
  Active = 'active',
  Expired = 'expired',
  Frozen = 'frozen',
  Unknown = 'unknown'
}

export type CollectionLimit = {
  length?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CommissionInfo = {
  __typename?: 'CommissionInfo';
  rateBps: Scalars['Int']['output'];
  recipientAddress?: Maybe<Scalars['String']['output']>;
  streamType: Scalars['String']['output'];
};

export type DbBlock = {
  __typename?: 'DbBlock';
  blockHashHex?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['String']['output']>;
  height: Scalars['Int']['output'];
  numTransactions: Scalars['Int']['output'];
  previousBlockHashHex?: Maybe<Scalars['String']['output']>;
  rootHex: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalFees?: Maybe<Scalars['String']['output']>;
  validatorIdentityKey?: Maybe<Scalars['String']['output']>;
};

export type DbRawTransaction = {
  __typename?: 'DbRawTransaction';
  blockHeight: Scalars['Int']['output'];
  chainId?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['String']['output']>;
  feeAmount?: Maybe<Scalars['String']['output']>;
  ibcStatus: Scalars['String']['output'];
  rawDataHex?: Maybe<Scalars['String']['output']>;
  rawJson: Scalars['JSON']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHashHex: Scalars['String']['output'];
};

export type DexStats = {
  __typename?: 'DexStats';
  openPositions: Scalars['Int']['output'];
  totalExecutions: Scalars['Int']['output'];
};

export type Event = {
  __typename?: 'Event';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Fee = {
  __typename?: 'Fee';
  amount: Scalars['String']['output'];
  assetId?: Maybe<AssetId>;
};

export type IbcRelay = {
  __typename?: 'IbcRelay';
  rawAction: Scalars['String']['output'];
};

export type IbcStats = {
  __typename?: 'IbcStats';
  channelId?: Maybe<Scalars['String']['output']>;
  clientId: Scalars['String']['output'];
  counterpartyChannelId?: Maybe<Scalars['String']['output']>;
  expiredTxCount: Scalars['Int']['output'];
  lastUpdated?: Maybe<Scalars['DateTime']['output']>;
  pendingTxCount: Scalars['Int']['output'];
  shieldedTxCount: Scalars['Int']['output'];
  shieldedVolume: Scalars['String']['output'];
  status: ClientStatus;
  totalTxCount: Scalars['Int']['output'];
  unshieldedTxCount: Scalars['Int']['output'];
  unshieldedVolume: Scalars['String']['output'];
};

export enum IbcStatus {
  Completed = 'COMPLETED',
  Error = 'ERROR',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Unknown = 'UNKNOWN'
}

export type IbcTransactionUpdate = {
  __typename?: 'IbcTransactionUpdate';
  blockHeight: Scalars['Int']['output'];
  clientId: Scalars['String']['output'];
  isStatusUpdate: Scalars['Boolean']['output'];
  raw: Scalars['String']['output'];
  status: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type IndividualSwap = {
  __typename?: 'IndividualSwap';
  inputAmount: Scalars['String']['output'];
  inputAssetId: Scalars['String']['output'];
  outputAmount: Scalars['String']['output'];
  outputAssetId: Scalars['String']['output'];
  routeSteps: Array<RouteStep>;
  swapIndex: Scalars['Int']['output'];
};

export type LiquidityPosition = {
  __typename?: 'LiquidityPosition';
  feePercentage: Scalars['Float']['output'];
  positionId: Scalars['String']['output'];
  reserves1Amount: Scalars['String']['output'];
  reserves2Amount: Scalars['String']['output'];
  state: LiquidityPositionState;
  tradingPairAsset1: Scalars['String']['output'];
  tradingPairAsset2: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LiquidityPositionCollection = {
  __typename?: 'LiquidityPositionCollection';
  items: Array<LiquidityPosition>;
  total: Scalars['Int']['output'];
};

export type LiquidityPositionFilter = {
  state?: InputMaybe<LiquidityPositionStateFilter>;
};

export enum LiquidityPositionState {
  Closed = 'CLOSED',
  Executing = 'EXECUTING',
  Open = 'OPEN',
  Withdrawn = 'WITHDRAWN'
}

export enum LiquidityPositionStateFilter {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type NotYetSupportedAction = {
  __typename?: 'NotYetSupportedAction';
  debug: Scalars['String']['output'];
};

export type NotePayload = {
  __typename?: 'NotePayload';
  encryptedNote: Scalars['String']['output'];
  ephemeralKey: Scalars['String']['output'];
  noteCommitment: Scalars['String']['output'];
};

export type Output = {
  __typename?: 'Output';
  body: OutputBody;
  proof: Scalars['String']['output'];
};

export type OutputBody = {
  __typename?: 'OutputBody';
  balanceCommitment: Scalars['String']['output'];
  notePayload: NotePayload;
  ovkWrappedKey: Scalars['String']['output'];
  wrappedMemoKey: Scalars['String']['output'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  block?: Maybe<Block>;
  blocks: BlockCollection;
  dbBlock?: Maybe<DbBlock>;
  dbBlocks: Array<DbBlock>;
  dbLatestBlock?: Maybe<DbBlock>;
  dbRawTransaction?: Maybe<DbRawTransaction>;
  dbRawTransactions: Array<DbRawTransaction>;
  dexStats: DexStats;
  ibcStats: Array<IbcStats>;
  ibcTotalShieldedVolume: TotalShieldedVolume;
  latestExecutions: Array<SwapExecution>;
  liquidityPositions: LiquidityPositionCollection;
  search?: Maybe<SearchResult>;
  stats: Stats;
  transaction?: Maybe<Transaction>;
  transactions: TransactionCollection;
  validatorDetails?: Maybe<ValidatorDetails>;
  validatorsHomepage: ValidatorHomepageData;
};


export type QueryRootBlockArgs = {
  height: Scalars['Int']['input'];
};


export type QueryRootBlocksArgs = {
  filter?: InputMaybe<BlockFilter>;
  limit: CollectionLimit;
};


export type QueryRootDbBlockArgs = {
  height: Scalars['Int']['input'];
};


export type QueryRootDbBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRootDbRawTransactionArgs = {
  txHashHex: Scalars['String']['input'];
};


export type QueryRootDbRawTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRootIbcStatsArgs = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  timePeriod?: InputMaybe<TimePeriod>;
};


export type QueryRootLatestExecutionsArgs = {
  filter?: InputMaybe<SwapExecutionFilter>;
};


export type QueryRootLiquidityPositionsArgs = {
  filter?: InputMaybe<LiquidityPositionFilter>;
  limit: CollectionLimit;
};


export type QueryRootSearchArgs = {
  slug: Scalars['String']['input'];
};


export type QueryRootTransactionArgs = {
  hash: Scalars['String']['input'];
};


export type QueryRootTransactionsArgs = {
  filter?: InputMaybe<TransactionFilter>;
  limit: CollectionLimit;
};


export type QueryRootValidatorDetailsArgs = {
  id: Scalars['String']['input'];
};


export type QueryRootValidatorsHomepageArgs = {
  filter?: InputMaybe<ValidatorFilter>;
};

export type Root = {
  __typename?: 'Root';
  blocks: BlockUpdate;
  chainParameters: ChainParametersUpdate;
  ibcTransactions: IbcTransactionUpdate;
  latestBlocks: BlockUpdate;
  latestIbcTransactions: IbcTransactionUpdate;
  latestTransactions: TransactionUpdate;
  totalShieldedVolume: TotalShieldedVolumeUpdate;
  transactionCount: TransactionCountUpdate;
  transactions: TransactionUpdate;
  validatorBlocks: ValidatorBlockUpdate;
};


export type RootIbcTransactionsArgs = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLatestBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLatestIbcTransactionsArgs = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type RootLatestTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type RootValidatorBlocksArgs = {
  validatorId: Scalars['String']['input'];
};

export type RouteStep = {
  __typename?: 'RouteStep';
  amount: Scalars['String']['output'];
  assetId: Scalars['String']['output'];
  routeStep: Scalars['Int']['output'];
};

export type SearchResult = Block | Transaction | ValidatorSearchResults;

export type Spend = {
  __typename?: 'Spend';
  authSig: Scalars['String']['output'];
  body: SpendBody;
  proof: Scalars['String']['output'];
};

export type SpendBody = {
  __typename?: 'SpendBody';
  balanceCommitment: Scalars['String']['output'];
  nullifier: Scalars['String']['output'];
  rk: Scalars['String']['output'];
};

export type StakingParameters = {
  __typename?: 'StakingParameters';
  activeValidatorCount: Scalars['Int']['output'];
  activeValidatorLimit: Scalars['Int']['output'];
  minValidatorStake: Scalars['Int']['output'];
  slashingPenaltyDowntime: Scalars['Float']['output'];
  slashingPenaltyMisbehavior: Scalars['Float']['output'];
  totalStaked: Scalars['Int']['output'];
  unbondingDelay: Scalars['Int']['output'];
  uptimeBlocksWindow: Scalars['Int']['output'];
  uptimeMinRequired: Scalars['Float']['output'];
};

export type Stats = {
  __typename?: 'Stats';
  totalTransactionsCount: Scalars['Int']['output'];
};

export type SwapExecution = {
  __typename?: 'SwapExecution';
  batchSwaps: Array<BatchSwap>;
  blockHeight: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type SwapExecutionFilter = {
  height?: InputMaybe<Scalars['Int']['input']>;
};

export enum TimePeriod {
  All = 'ALL',
  Day = 'DAY',
  Month = 'MONTH'
}

export type TotalShieldedVolume = {
  __typename?: 'TotalShieldedVolume';
  /** Total shielded volume across all IBC clients */
  value: Scalars['String']['output'];
};

export type TotalShieldedVolumeUpdate = {
  __typename?: 'TotalShieldedVolumeUpdate';
  value: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  anchor: Scalars['String']['output'];
  bindingSig: Scalars['String']['output'];
  block: Block;
  body: TransactionBody;
  clientId?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  ibcStatus: IbcStatus;
  index: Scalars['Int']['output'];
  raw: Scalars['String']['output'];
  rawEvents: Array<Event>;
  rawJson: Scalars['JSON']['output'];
};

export type TransactionBody = {
  __typename?: 'TransactionBody';
  actions: Array<Action>;
  actionsCount: Scalars['Int']['output'];
  detectionData: Array<Scalars['String']['output']>;
  memo?: Maybe<Scalars['String']['output']>;
  parameters: TransactionParameters;
  rawActions: Array<Scalars['String']['output']>;
};

export type TransactionCollection = {
  __typename?: 'TransactionCollection';
  items: Array<Transaction>;
  total: Scalars['Int']['output'];
};

export type TransactionCountUpdate = {
  __typename?: 'TransactionCountUpdate';
  count: Scalars['Int']['output'];
};

export type TransactionFilter = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  validator?: InputMaybe<Scalars['String']['input']>;
};

export type TransactionParameters = {
  __typename?: 'TransactionParameters';
  chainId: Scalars['String']['output'];
  expiryHeight: Scalars['Int']['output'];
  fee: Fee;
};

export type TransactionUpdate = {
  __typename?: 'TransactionUpdate';
  hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  raw: Scalars['String']['output'];
};

export type Validator = {
  __typename?: 'Validator';
  bondingState: BondingState;
  commission: Scalars['Float']['output'];
  firstSeenTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  state: ValidatorState;
  uptime?: Maybe<Scalars['Float']['output']>;
  votingPower: Scalars['Int']['output'];
  votingPowerActivePercentage: Scalars['Float']['output'];
};

export type ValidatorBlockUpdate = {
  __typename?: 'ValidatorBlockUpdate';
  blockHeight: Scalars['Int']['output'];
  signed: Scalars['Boolean']['output'];
  validatorId: Scalars['String']['output'];
};

export type ValidatorDetails = {
  __typename?: 'ValidatorDetails';
  activeSince?: Maybe<Scalars['DateTime']['output']>;
  bondingState: BondingState;
  commissionPercentage: Scalars['Float']['output'];
  commissionStreams: Array<CommissionInfo>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  last300Blocks: Array<BlockParticipation>;
  missedBlocks: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signedBlocks: Scalars['Int']['output'];
  state: ValidatorState;
  totalUptime?: Maybe<Scalars['Float']['output']>;
  uptimeBlockWindow: Scalars['Int']['output'];
  votingPower: Scalars['Int']['output'];
  votingPowerActivePercentage: Scalars['Float']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type ValidatorFilter = {
  state?: InputMaybe<ValidatorStateFilter>;
};

export type ValidatorHomepageData = {
  __typename?: 'ValidatorHomepageData';
  chainParameters?: Maybe<ChainParameters>;
  stakingParameters: StakingParameters;
  validators: Array<Validator>;
};

export type ValidatorSearchResult = {
  __typename?: 'ValidatorSearchResult';
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type ValidatorSearchResults = {
  __typename?: 'ValidatorSearchResults';
  items: Array<ValidatorSearchResult>;
  total: Scalars['Int']['output'];
};

export enum ValidatorState {
  ValidatorStateEnumActive = 'VALIDATOR_STATE_ENUM_ACTIVE',
  ValidatorStateEnumDefined = 'VALIDATOR_STATE_ENUM_DEFINED',
  ValidatorStateEnumDisabled = 'VALIDATOR_STATE_ENUM_DISABLED',
  ValidatorStateEnumInactive = 'VALIDATOR_STATE_ENUM_INACTIVE',
  ValidatorStateEnumJailed = 'VALIDATOR_STATE_ENUM_JAILED',
  ValidatorStateEnumTombstoned = 'VALIDATOR_STATE_ENUM_TOMBSTONED',
  ValidatorStateEnumUnspecified = 'VALIDATOR_STATE_ENUM_UNSPECIFIED'
}

export enum ValidatorStateFilter {
  Active = 'ACTIVE',
  All = 'ALL',
  Inactive = 'INACTIVE'
}

export type BlockFragment = { __typename?: 'Block', height: number, createdAt: any, rawJson: any, transactions: Array<{ __typename?: 'Transaction', hash: string, ibcStatus: IbcStatus, raw: string, block: { __typename?: 'Block', height: number, createdAt: any } }> };

export type PartialBlockFragment = { __typename?: 'Block', height: number, createdAt: any, transactionsCount: number };

export type PartialTransactionFragment = { __typename?: 'Transaction', hash: string, ibcStatus: IbcStatus, raw: string, block: { __typename?: 'Block', height: number, createdAt: any } };

export type TransactionFragment = { __typename?: 'Transaction', hash: string, raw: string, rawJson: any, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: string } } } };

export type ActiveValidatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveValidatorsQuery = { __typename?: 'QueryRoot', validatorsHomepage: { __typename?: 'ValidatorHomepageData', stakingParameters: { __typename?: 'StakingParameters', activeValidatorCount: number, activeValidatorLimit: number } } };

export type ActiveVotingPowerQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveVotingPowerQuery = { __typename?: 'QueryRoot', validatorsHomepage: { __typename?: 'ValidatorHomepageData', stakingParameters: { __typename?: 'StakingParameters', totalStaked: number } } };

export type BlockQueryVariables = Exact<{
  height: Scalars['Int']['input'];
}>;


export type BlockQuery = { __typename?: 'QueryRoot', block?: { __typename?: 'Block', height: number, createdAt: any, rawJson: any, transactions: Array<{ __typename?: 'Transaction', hash: string, ibcStatus: IbcStatus, raw: string, block: { __typename?: 'Block', height: number, createdAt: any } }> } | null };

export type BlocksQueryVariables = Exact<{
  limit: CollectionLimit;
  filter?: InputMaybe<BlockFilter>;
}>;


export type BlocksQuery = { __typename?: 'QueryRoot', blocks: { __typename?: 'BlockCollection', total: number, items: Array<{ __typename?: 'Block', height: number, createdAt: any, transactionsCount: number }> } };

export type ChainParametersQueryVariables = Exact<{ [key: string]: never; }>;


export type ChainParametersQuery = { __typename?: 'QueryRoot', validatorsHomepage: { __typename?: 'ValidatorHomepageData', chainParameters?: { __typename?: 'ChainParameters', chainId: string, currentBlockTime: any, currentBlockHeight: number, currentEpoch: number, epochDuration: number, nextEpochIn: number } | null } };

export type DexBlockExecutionsQueryVariables = Exact<{
  filter?: InputMaybe<SwapExecutionFilter>;
}>;


export type DexBlockExecutionsQuery = { __typename?: 'QueryRoot', latestExecutions: Array<{ __typename?: 'SwapExecution', blockHeight: number, timestamp: any, batchSwaps: Array<{ __typename?: 'BatchSwap', id: number, executionType: string, totalInputAssetId: string, totalInputAmount: string, totalOutputAssetId: string, totalOutputAmount: string, individualSwaps: Array<{ __typename?: 'IndividualSwap', routeSteps: Array<{ __typename?: 'RouteStep', assetId: string, amount: string }> }> }> }> };

export type DexLiquidityPositionsQueryVariables = Exact<{
  limit: CollectionLimit;
  filter?: InputMaybe<LiquidityPositionFilter>;
}>;


export type DexLiquidityPositionsQuery = { __typename?: 'QueryRoot', liquidityPositions: { __typename?: 'LiquidityPositionCollection', total: number, items: Array<{ __typename?: 'LiquidityPosition', tradingPairAsset1: string, tradingPairAsset2: string, reserves1Amount: string, reserves2Amount: string, state: LiquidityPositionState, feePercentage: number, updatedAt: any, positionId: string }> } };

export type DexOpenPositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type DexOpenPositionsQuery = { __typename?: 'QueryRoot', dexStats: { __typename?: 'DexStats', openPositions: number } };

export type DexTotalExecutionsQueryVariables = Exact<{ [key: string]: never; }>;


export type DexTotalExecutionsQuery = { __typename?: 'QueryRoot', dexStats: { __typename?: 'DexStats', totalExecutions: number } };

export type IbcStatsQueryVariables = Exact<{
  clientId?: InputMaybe<Scalars['String']['input']>;
  timePeriod?: InputMaybe<TimePeriod>;
}>;


export type IbcStatsQuery = { __typename?: 'QueryRoot', ibcStats: Array<{ __typename?: 'IbcStats', status: ClientStatus, channelId?: string | null, counterpartyChannelId?: string | null, lastUpdated?: any | null, shieldedVolume: string, shieldedTxCount: number, unshieldedVolume: string, unshieldedTxCount: number, totalTxCount: number, pendingTxCount: number, expiredTxCount: number, id: string }> };

export type MinValidatorStakeQueryVariables = Exact<{ [key: string]: never; }>;


export type MinValidatorStakeQuery = { __typename?: 'QueryRoot', validatorsHomepage: { __typename?: 'ValidatorHomepageData', stakingParameters: { __typename?: 'StakingParameters', minValidatorStake: number } } };

export type SearchQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'QueryRoot', search?: { __typename: 'Block', height: number } | { __typename: 'Transaction', hash: string } | { __typename: 'ValidatorSearchResults', items: Array<{ __typename?: 'ValidatorSearchResult', id: string, displayName: string }> } | null };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename?: 'QueryRoot', stats: { __typename?: 'Stats', totalTransactionsCount: number } };

export type TotalShieldedVolumeQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalShieldedVolumeQuery = { __typename?: 'QueryRoot', ibcTotalShieldedVolume: { __typename?: 'TotalShieldedVolume', value: string } };

export type TransactionQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type TransactionQuery = { __typename?: 'QueryRoot', transaction?: { __typename?: 'Transaction', hash: string, raw: string, rawJson: any, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: string } } } } | null };

export type TransactionsQueryVariables = Exact<{
  limit: CollectionLimit;
  filter?: InputMaybe<TransactionFilter>;
}>;


export type TransactionsQuery = { __typename?: 'QueryRoot', transactions: { __typename?: 'TransactionCollection', total: number, items: Array<{ __typename?: 'Transaction', hash: string, ibcStatus: IbcStatus, raw: string, block: { __typename?: 'Block', height: number, createdAt: any } }> } };

export type ValidatorActiveSinceQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ValidatorActiveSinceQuery = { __typename?: 'QueryRoot', validatorDetails?: { __typename?: 'ValidatorDetails', activeSince?: any | null } | null };

export type ValidatorBlocksQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ValidatorBlocksQuery = { __typename?: 'QueryRoot', validatorDetails?: { __typename?: 'ValidatorDetails', state: ValidatorState, last300Blocks: Array<{ __typename?: 'BlockParticipation', height: number, signed: boolean }> } | null };

export type ValidatorParametersQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidatorParametersQuery = { __typename?: 'QueryRoot', validatorsHomepage: { __typename?: 'ValidatorHomepageData', stakingParameters: { __typename?: 'StakingParameters', uptimeBlocksWindow: number, uptimeMinRequired: number, slashingPenaltyDowntime: number, slashingPenaltyMisbehavior: number, unbondingDelay: number } } };

export type ValidatorQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ValidatorQuery = { __typename?: 'QueryRoot', validatorDetails?: { __typename?: 'ValidatorDetails', id: string, name?: string | null, state: ValidatorState, bondingState: BondingState, website?: string | null, description?: string | null, totalUptime?: number | null, uptimeBlockWindow: number, signedBlocks: number, missedBlocks: number, commissionPercentage: number, commissionStreams: Array<{ __typename?: 'CommissionInfo', recipientAddress?: string | null, streamType: string, rateBps: number }> } | null };

export type ValidatorVotingPercentageQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ValidatorVotingPercentageQuery = { __typename?: 'QueryRoot', validatorDetails?: { __typename?: 'ValidatorDetails', votingPowerActivePercentage: number } | null };

export type ValidatorVotingPowerQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ValidatorVotingPowerQuery = { __typename?: 'QueryRoot', validatorDetails?: { __typename?: 'ValidatorDetails', state: ValidatorState, votingPower: number } | null };

export type ValidatorsQueryVariables = Exact<{
  filter?: InputMaybe<ValidatorFilter>;
}>;


export type ValidatorsQuery = { __typename?: 'QueryRoot', validatorsHomepage: { __typename?: 'ValidatorHomepageData', validators: Array<{ __typename?: 'Validator', id: string, name?: string | null, state: ValidatorState, bondingState: BondingState, votingPower: number, votingPowerActivePercentage: number, uptime?: number | null, firstSeenTime?: any | null, commission: number }> } };

export type BlockUpdateSubscriptionVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type BlockUpdateSubscription = { __typename?: 'Root', latestBlocks: { __typename?: 'BlockUpdate', height: number, createdAt: any, transactionsCount: number } };

export type ChainParametersUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChainParametersUpdateSubscription = { __typename?: 'Root', chainParameters: { __typename?: 'ChainParametersUpdate', chainId: string, currentBlockTime: any, currentBlockHeight: number, currentEpoch: number, epochDuration: number, nextEpochIn: number } };

export type TotalShieldedVolumeUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TotalShieldedVolumeUpdateSubscription = { __typename?: 'Root', totalShieldedVolume: { __typename?: 'TotalShieldedVolumeUpdate', value: string } };

export type TransactionCountUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TransactionCountUpdateSubscription = { __typename?: 'Root', transactionCount: { __typename?: 'TransactionCountUpdate', count: number } };

export type TransactionUpdateSubscriptionVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type TransactionUpdateSubscription = { __typename?: 'Root', latestTransactions: { __typename?: 'TransactionUpdate', hash: string, id: number, raw: string } };

export type ValidatorBlockUpdateSubscriptionVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ValidatorBlockUpdateSubscription = { __typename?: 'Root', validatorBlocks: { __typename?: 'ValidatorBlockUpdate', blockHeight: number, signed: boolean } };

export const PartialTransactionFragmentDoc = gql`
    fragment PartialTransaction on Transaction {
  hash
  block {
    height
    createdAt
  }
  ibcStatus
  raw
}
    `;
export const BlockFragmentDoc = gql`
    fragment Block on Block {
  height
  createdAt
  transactions {
    ...PartialTransaction
  }
  rawJson
}
    ${PartialTransactionFragmentDoc}`;
export const PartialBlockFragmentDoc = gql`
    fragment PartialBlock on Block {
  height
  createdAt
  transactionsCount
}
    `;
export const TransactionFragmentDoc = gql`
    fragment Transaction on Transaction {
  hash
  block {
    height
    createdAt
  }
  body {
    parameters {
      chainId
      fee {
        amount
      }
    }
  }
  raw
  rawJson
}
    `;
export const ActiveValidatorsDocument = gql`
    query ActiveValidators {
  validatorsHomepage {
    stakingParameters {
      activeValidatorCount
      activeValidatorLimit
    }
  }
}
    `;
export const ActiveVotingPowerDocument = gql`
    query ActiveVotingPower {
  validatorsHomepage {
    stakingParameters {
      totalStaked
    }
  }
}
    `;
export const BlockDocument = gql`
    query Block($height: Int!) {
  block(height: $height) {
    ...Block
  }
}
    ${BlockFragmentDoc}`;
export const BlocksDocument = gql`
    query Blocks($limit: CollectionLimit!, $filter: BlockFilter) {
  blocks(limit: $limit, filter: $filter) {
    items {
      ...PartialBlock
    }
    total
  }
}
    ${PartialBlockFragmentDoc}`;
export const ChainParametersDocument = gql`
    query ChainParameters {
  validatorsHomepage {
    chainParameters {
      chainId
      currentBlockTime
      currentBlockHeight
      currentEpoch
      epochDuration
      nextEpochIn
    }
  }
}
    `;
export const DexBlockExecutionsDocument = gql`
    query DexBlockExecutions($filter: SwapExecutionFilter) {
  latestExecutions(filter: $filter) {
    blockHeight
    timestamp
    batchSwaps {
      id
      executionType
      totalInputAssetId
      totalInputAmount
      totalOutputAssetId
      totalOutputAmount
      individualSwaps {
        routeSteps {
          assetId
          amount
        }
      }
    }
  }
}
    `;
export const DexLiquidityPositionsDocument = gql`
    query DexLiquidityPositions($limit: CollectionLimit!, $filter: LiquidityPositionFilter) {
  liquidityPositions(limit: $limit, filter: $filter) {
    items {
      tradingPairAsset1
      tradingPairAsset2
      reserves1Amount
      reserves2Amount
      state
      feePercentage
      updatedAt
      positionId
    }
    total
  }
}
    `;
export const DexOpenPositionsDocument = gql`
    query DexOpenPositions {
  dexStats {
    openPositions
  }
}
    `;
export const DexTotalExecutionsDocument = gql`
    query DexTotalExecutions {
  dexStats {
    totalExecutions
  }
}
    `;
export const IbcStatsDocument = gql`
    query IbcStats($clientId: String, $timePeriod: TimePeriod) {
  ibcStats(clientId: $clientId, timePeriod: $timePeriod) {
    id: clientId
    status
    channelId
    counterpartyChannelId
    lastUpdated
    shieldedVolume
    shieldedTxCount
    unshieldedVolume
    unshieldedTxCount
    totalTxCount
    pendingTxCount
    expiredTxCount
  }
}
    `;
export const MinValidatorStakeDocument = gql`
    query MinValidatorStake {
  validatorsHomepage {
    stakingParameters {
      minValidatorStake
    }
  }
}
    `;
export const SearchDocument = gql`
    query Search($slug: String!) {
  search(slug: $slug) {
    __typename
    ... on Block {
      height
    }
    ... on Transaction {
      hash
    }
    ... on ValidatorSearchResults {
      items {
        id
        displayName
      }
    }
  }
}
    `;
export const StatsDocument = gql`
    query Stats {
  stats {
    totalTransactionsCount
  }
}
    `;
export const TotalShieldedVolumeDocument = gql`
    query TotalShieldedVolume {
  ibcTotalShieldedVolume {
    value
  }
}
    `;
export const TransactionDocument = gql`
    query Transaction($hash: String!) {
  transaction(hash: $hash) {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;
export const TransactionsDocument = gql`
    query Transactions($limit: CollectionLimit!, $filter: TransactionFilter) {
  transactions(limit: $limit, filter: $filter) {
    items {
      ...PartialTransaction
    }
    total
  }
}
    ${PartialTransactionFragmentDoc}`;
export const ValidatorActiveSinceDocument = gql`
    query ValidatorActiveSince($id: String!) {
  validatorDetails(id: $id) {
    activeSince
  }
}
    `;
export const ValidatorBlocksDocument = gql`
    query ValidatorBlocks($id: String!) {
  validatorDetails(id: $id) {
    state
    last300Blocks {
      height
      signed
    }
  }
}
    `;
export const ValidatorParametersDocument = gql`
    query ValidatorParameters {
  validatorsHomepage {
    stakingParameters {
      uptimeBlocksWindow
      uptimeMinRequired
      slashingPenaltyDowntime
      slashingPenaltyMisbehavior
      unbondingDelay
    }
  }
}
    `;
export const ValidatorDocument = gql`
    query Validator($id: String!) {
  validatorDetails(id: $id) {
    id
    name
    state
    bondingState
    website
    description
    totalUptime
    uptimeBlockWindow
    signedBlocks
    missedBlocks
    commissionPercentage
    commissionStreams {
      recipientAddress
      streamType
      rateBps
    }
  }
}
    `;
export const ValidatorVotingPercentageDocument = gql`
    query ValidatorVotingPercentage($id: String!) {
  validatorDetails(id: $id) {
    votingPowerActivePercentage
  }
}
    `;
export const ValidatorVotingPowerDocument = gql`
    query ValidatorVotingPower($id: String!) {
  validatorDetails(id: $id) {
    state
    votingPower
  }
}
    `;
export const ValidatorsDocument = gql`
    query Validators($filter: ValidatorFilter) {
  validatorsHomepage(filter: $filter) {
    validators {
      id
      name
      state
      bondingState
      votingPower
      votingPowerActivePercentage
      uptime
      firstSeenTime
      commission
    }
  }
}
    `;
export const BlockUpdateDocument = gql`
    subscription BlockUpdate($limit: Int!) {
  latestBlocks(limit: $limit) {
    height
    createdAt
    transactionsCount
  }
}
    `;
export const ChainParametersUpdateDocument = gql`
    subscription ChainParametersUpdate {
  chainParameters {
    chainId
    currentBlockTime
    currentBlockHeight
    currentEpoch
    epochDuration
    nextEpochIn
  }
}
    `;
export const TotalShieldedVolumeUpdateDocument = gql`
    subscription TotalShieldedVolumeUpdate {
  totalShieldedVolume {
    value
  }
}
    `;
export const TransactionCountUpdateDocument = gql`
    subscription TransactionCountUpdate {
  transactionCount {
    count
  }
}
    `;
export const TransactionUpdateDocument = gql`
    subscription TransactionUpdate($limit: Int!) {
  latestTransactions(limit: $limit) {
    hash
    id
    raw
  }
}
    `;
export const ValidatorBlockUpdateDocument = gql`
    subscription ValidatorBlockUpdate($id: String!) {
  validatorBlocks(validatorId: $id) {
    blockHeight
    signed
  }
}
    `;