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

export type Block = {
  __typename?: 'Block';
  chainId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  height: Scalars['Int']['output'];
  rawEvents: Array<Event>;
  rawJson?: Maybe<Scalars['String']['output']>;
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

export type BlockHeightRange = {
  from: Scalars['Int']['input'];
  to: Scalars['Int']['input'];
};

export type BlockUpdate = {
  __typename?: 'BlockUpdate';
  createdAt: Scalars['DateTime']['output'];
  height: Scalars['Int']['output'];
  transactionsCount: Scalars['Int']['output'];
};

export type BlocksSelector = {
  latest?: InputMaybe<LatestBlock>;
  range?: InputMaybe<BlockHeightRange>;
};

export type ChannelPair = {
  __typename?: 'ChannelPair';
  channelId: Scalars['String']['output'];
  clientId: Scalars['String']['output'];
  completedTxCount: Scalars['Int']['output'];
  connectionId?: Maybe<Scalars['String']['output']>;
  counterpartyChannelId?: Maybe<Scalars['String']['output']>;
  pendingTxCount: Scalars['Int']['output'];
};

export type CollectionLimit = {
  length?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  rawJson?: Maybe<Scalars['JSON']['output']>;
  timestamp: Scalars['DateTime']['output'];
  txHashHex: Scalars['String']['output'];
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
  status?: Maybe<Scalars['String']['output']>;
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

export type LatestBlock = {
  limit: Scalars['Int']['input'];
};

export type LatestTransactions = {
  limit: Scalars['Int']['input'];
};

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
  blocks: Array<Block>;
  blocksCollection: BlockCollection;
  dbBlock?: Maybe<DbBlock>;
  dbBlocks: Array<DbBlock>;
  dbLatestBlock?: Maybe<DbBlock>;
  dbRawTransaction?: Maybe<DbRawTransaction>;
  dbRawTransactions: Array<DbRawTransaction>;
  ibcChannelPairs: Array<ChannelPair>;
  ibcChannelPairsByClientId: Array<ChannelPair>;
  ibcStats: Array<IbcStats>;
  ibcStatsByClientId?: Maybe<IbcStats>;
  ibcTotalShieldedVolume: TotalShieldedVolume;
  search?: Maybe<SearchResult>;
  stats: Stats;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  transactionsCollection: TransactionCollection;
};


export type QueryRootBlockArgs = {
  height: Scalars['Int']['input'];
};


export type QueryRootBlocksArgs = {
  selector: BlocksSelector;
};


export type QueryRootBlocksCollectionArgs = {
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


export type QueryRootIbcChannelPairsArgs = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRootIbcChannelPairsByClientIdArgs = {
  clientId: Scalars['String']['input'];
};


export type QueryRootIbcStatsArgs = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  timePeriod?: InputMaybe<TimePeriod>;
};


export type QueryRootIbcStatsByClientIdArgs = {
  clientId: Scalars['String']['input'];
  timePeriod?: InputMaybe<TimePeriod>;
};


export type QueryRootSearchArgs = {
  slug: Scalars['String']['input'];
};


export type QueryRootTransactionArgs = {
  hash: Scalars['String']['input'];
};


export type QueryRootTransactionsArgs = {
  selector: TransactionsSelector;
};


export type QueryRootTransactionsCollectionArgs = {
  filter?: InputMaybe<TransactionFilter>;
  limit: CollectionLimit;
};

export enum RangeDirection {
  Next = 'NEXT',
  Previous = 'PREVIOUS'
}

export type Root = {
  __typename?: 'Root';
  blocks: BlockUpdate;
  ibcTransactions: IbcTransactionUpdate;
  latestBlocks: BlockUpdate;
  latestIbcTransactions: IbcTransactionUpdate;
  latestTransactions: TransactionUpdate;
  totalShieldedVolume: TotalShieldedVolumeUpdate;
  transactionCount: TransactionCountUpdate;
  transactions: TransactionUpdate;
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

export type SearchResult = Block | Transaction;

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

export type Stats = {
  __typename?: 'Stats';
  totalTransactionsCount: Scalars['Int']['output'];
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
  rawJson: Scalars['String']['output'];
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
};

export type TransactionParameters = {
  __typename?: 'TransactionParameters';
  chainId: Scalars['String']['output'];
  expiryHeight: Scalars['Int']['output'];
  fee: Fee;
};

export type TransactionRange = {
  direction: RangeDirection;
  fromTxHash: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
};

export type TransactionUpdate = {
  __typename?: 'TransactionUpdate';
  hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  raw: Scalars['String']['output'];
};

export type TransactionsSelector = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  latest?: InputMaybe<LatestTransactions>;
  range?: InputMaybe<TransactionRange>;
};

export type BlockFragment = { __typename?: 'Block', height: number, createdAt: any, rawJson?: string | null, transactions: Array<{ __typename?: 'Transaction', hash: string, ibcStatus: IbcStatus, raw: string, block: { __typename?: 'Block', height: number, createdAt: any } }> };

export type PartialBlockFragment = { __typename?: 'Block', height: number, createdAt: any, transactionsCount: number };

export type PartialTransactionFragment = { __typename?: 'Transaction', hash: string, ibcStatus: IbcStatus, raw: string, block: { __typename?: 'Block', height: number, createdAt: any } };

export type TransactionFragment = { __typename?: 'Transaction', hash: string, raw: string, rawJson: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: string } } } };

export type BlockQueryVariables = Exact<{
  height: Scalars['Int']['input'];
}>;


export type BlockQuery = { __typename?: 'QueryRoot', block?: { __typename?: 'Block', height: number, createdAt: any, rawJson?: string | null, transactions: Array<{ __typename?: 'Transaction', hash: string, ibcStatus: IbcStatus, raw: string, block: { __typename?: 'Block', height: number, createdAt: any } }> } | null };

export type BlocksQueryVariables = Exact<{
  limit: CollectionLimit;
  filter?: InputMaybe<BlockFilter>;
}>;


export type BlocksQuery = { __typename?: 'QueryRoot', blocksCollection: { __typename?: 'BlockCollection', total: number, items: Array<{ __typename?: 'Block', height: number, createdAt: any, transactionsCount: number }> } };

export type IbcStatsQueryVariables = Exact<{
  clientId?: InputMaybe<Scalars['String']['input']>;
  timePeriod?: InputMaybe<TimePeriod>;
}>;


export type IbcStatsQuery = { __typename?: 'QueryRoot', ibcStats: Array<{ __typename?: 'IbcStats', clientId: string, status?: string | null, channelId?: string | null, counterpartyChannelId?: string | null, shieldedVolume: string, shieldedTxCount: number, unshieldedVolume: string, unshieldedTxCount: number, pendingTxCount: number, expiredTxCount: number }> };

export type SearchQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'QueryRoot', search?: { __typename: 'Block', height: number } | { __typename: 'Transaction', hash: string } | null };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename?: 'QueryRoot', stats: { __typename?: 'Stats', totalTransactionsCount: number } };

export type TotalShieldedVolumeQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalShieldedVolumeQuery = { __typename?: 'QueryRoot', ibcTotalShieldedVolume: { __typename?: 'TotalShieldedVolume', value: string } };

export type TransactionQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type TransactionQuery = { __typename?: 'QueryRoot', transaction?: { __typename?: 'Transaction', hash: string, raw: string, rawJson: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: string } } } } | null };

export type TransactionsQueryVariables = Exact<{
  limit: CollectionLimit;
  filter?: InputMaybe<TransactionFilter>;
}>;


export type TransactionsQuery = { __typename?: 'QueryRoot', transactionsCollection: { __typename?: 'TransactionCollection', total: number, items: Array<{ __typename?: 'Transaction', hash: string, ibcStatus: IbcStatus, raw: string, block: { __typename?: 'Block', height: number, createdAt: any } }> } };

export type BlockUpdateSubscriptionVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type BlockUpdateSubscription = { __typename?: 'Root', latestBlocks: { __typename?: 'BlockUpdate', height: number, createdAt: any, transactionsCount: number } };

export type TotalShieldedVolumeUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TotalShieldedVolumeUpdateSubscription = { __typename?: 'Root', totalShieldedVolume: { __typename?: 'TotalShieldedVolumeUpdate', value: string } };

export type TransactionCountUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TransactionCountUpdateSubscription = { __typename?: 'Root', transactionCount: { __typename?: 'TransactionCountUpdate', count: number } };

export type TransactionUpdateSubscriptionVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type TransactionUpdateSubscription = { __typename?: 'Root', latestTransactions: { __typename?: 'TransactionUpdate', hash: string, id: number, raw: string } };

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
export const BlockDocument = gql`
    query Block($height: Int!) {
  block(height: $height) {
    ...Block
  }
}
    ${BlockFragmentDoc}`;
export const BlocksDocument = gql`
    query Blocks($limit: CollectionLimit!, $filter: BlockFilter) {
  blocksCollection(limit: $limit, filter: $filter) {
    items {
      ...PartialBlock
    }
    total
  }
}
    ${PartialBlockFragmentDoc}`;
export const IbcStatsDocument = gql`
    query IbcStats($clientId: String, $timePeriod: TimePeriod) {
  ibcStats(clientId: $clientId, timePeriod: $timePeriod) {
    clientId
    status
    channelId
    counterpartyChannelId
    shieldedVolume
    shieldedTxCount
    unshieldedVolume
    unshieldedTxCount
    pendingTxCount
    expiredTxCount
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
  transactionsCollection(limit: $limit, filter: $filter) {
    items {
      ...PartialTransaction
    }
    total
  }
}
    ${PartialTransactionFragmentDoc}`;
export const BlockUpdateDocument = gql`
    subscription BlockUpdate($limit: Int!) {
  latestBlocks(limit: $limit) {
    height
    createdAt
    transactionsCount
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