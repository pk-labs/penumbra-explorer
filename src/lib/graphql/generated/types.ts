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
  U128: { input: any; output: any; }
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
  createdAt: Scalars['DateTime']['output'];
  height: Scalars['Int']['output'];
  rawEvents: Array<Event>;
  transactions: Array<Transaction>;
  transactionsCount: Scalars['Int']['output'];
};

export type BlockHeightRange = {
  from: Scalars['Int']['input'];
  to: Scalars['Int']['input'];
};

export type BlocksSelector = {
  latest?: InputMaybe<LatestBlock>;
  range?: InputMaybe<BlockHeightRange>;
};

export type Event = {
  __typename?: 'Event';
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Fee = {
  __typename?: 'Fee';
  amount: Scalars['U128']['output'];
  assetId?: Maybe<AssetId>;
};

export type IbcRelay = {
  __typename?: 'IbcRelay';
  rawAction: Scalars['String']['output'];
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
  search?: Maybe<SearchResult>;
  stats: Stats;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
};


export type QueryRootBlockArgs = {
  height: Scalars['Int']['input'];
};


export type QueryRootBlocksArgs = {
  selector: BlocksSelector;
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

export type Transaction = {
  __typename?: 'Transaction';
  anchor: Scalars['String']['output'];
  bindingSig: Scalars['String']['output'];
  block: Block;
  body: TransactionBody;
  hash: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  raw: Scalars['String']['output'];
  rawEvents: Array<Event>;
  result: TransactionResult;
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

export type TransactionParameters = {
  __typename?: 'TransactionParameters';
  chainId: Scalars['String']['output'];
  expiryHeight: Scalars['Int']['output'];
  fee: Fee;
};

export type TransactionRange = {
  fromTxHash: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
};

export type TransactionResult = {
  __typename?: 'TransactionResult';
  code: Scalars['Int']['output'];
  codespace: Scalars['String']['output'];
  data: Scalars['String']['output'];
  events: Array<Scalars['String']['output']>;
  gasUsed: Scalars['Int']['output'];
  gasWanted: Scalars['Int']['output'];
  info: Scalars['String']['output'];
  log: Scalars['String']['output'];
};

export type TransactionsSelector = {
  latest?: InputMaybe<LatestTransactions>;
  range?: InputMaybe<TransactionRange>;
};

export type BlockFragment = { __typename?: 'Block', height: number, createdAt: any, transactions: Array<{ __typename?: 'Transaction', hash: string, raw: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } }> };

export type PartialBlockFragment = { __typename?: 'Block', height: number, createdAt: any, transactionsCount: number };

export type PartialTransactionFragment = { __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }> } };

export type TransactionFragment = { __typename?: 'Transaction', hash: string, raw: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } };

export type BlockQueryVariables = Exact<{
  height: Scalars['Int']['input'];
}>;


export type BlockQuery = { __typename?: 'QueryRoot', block?: { __typename?: 'Block', height: number, createdAt: any, transactions: Array<{ __typename?: 'Transaction', hash: string, raw: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } }> } | null };

export type BlocksQueryVariables = Exact<{
  selector: BlocksSelector;
}>;


export type BlocksQuery = { __typename?: 'QueryRoot', blocks: Array<{ __typename?: 'Block', height: number, createdAt: any, transactionsCount: number }> };

export type SearchQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'QueryRoot', search?: { __typename: 'Block', height: number } | { __typename: 'Transaction', hash: string } | null };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename?: 'QueryRoot', stats: { __typename?: 'Stats', totalTransactionsCount: number } };

export type TransactionQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type TransactionQuery = { __typename?: 'QueryRoot', transaction?: { __typename?: 'Transaction', hash: string, raw: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } } | null };

export type TransactionsQueryVariables = Exact<{
  selector: TransactionsSelector;
}>;


export type TransactionsQuery = { __typename?: 'QueryRoot', transactions: Array<{ __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }> } }> };

export const TransactionFragmentDoc = gql`
    fragment Transaction on Transaction {
  hash
  block {
    height
    createdAt
  }
  body {
    actions {
      __typename
    }
    actionsCount
    memo
    parameters {
      chainId
      fee {
        amount
      }
    }
  }
  raw
}
    `;
export const BlockFragmentDoc = gql`
    fragment Block on Block {
  height
  createdAt
  transactions {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;
export const PartialBlockFragmentDoc = gql`
    fragment PartialBlock on Block {
  height
  createdAt
  transactionsCount
}
    `;
export const PartialTransactionFragmentDoc = gql`
    fragment PartialTransaction on Transaction {
  hash
  block {
    height
    createdAt
  }
  body {
    actions {
      __typename
    }
    actionsCount
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
    query Blocks($selector: BlocksSelector!) {
  blocks(selector: $selector) {
    ...PartialBlock
  }
}
    ${PartialBlockFragmentDoc}`;
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
export const TransactionDocument = gql`
    query Transaction($hash: String!) {
  transaction(hash: $hash) {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;
export const TransactionsDocument = gql`
    query Transactions($selector: TransactionsSelector!) {
  transactions(selector: $selector) {
    ...PartialTransaction
  }
}
    ${PartialTransactionFragmentDoc}`;