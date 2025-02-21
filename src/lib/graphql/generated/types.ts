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
  /** TODO: replace stub with actual data */
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
  latestTransactions: Array<Transaction>;
  search?: Maybe<SearchResult>;
  transaction?: Maybe<Transaction>;
};


export type QueryRootBlockArgs = {
  height: Scalars['Int']['input'];
};


export type QueryRootBlocksArgs = {
  selector: BlocksSelector;
};


export type QueryRootLatestTransactionsArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryRootSearchArgs = {
  slug: Scalars['String']['input'];
};


export type QueryRootTransactionArgs = {
  hash: Scalars['String']['input'];
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

export type BlockFragment = { __typename?: 'Block', height: number, createdAt: any, transactionsCount: number, transactions: Array<{ __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } }> };

export type TransactionFragment = { __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } };

export type BlockQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type BlockQuery = { __typename?: 'QueryRoot', block?: { __typename?: 'Block', height: number, createdAt: any, transactionsCount: number, transactions: Array<{ __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } }> } | null };

export type BlocksQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type BlocksQuery = { __typename?: 'QueryRoot', blocks: Array<{ __typename?: 'Block', height: number, createdAt: any, transactionsCount: number, transactions: Array<{ __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } }> }> };

export type TransactionQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TransactionQuery = { __typename?: 'QueryRoot', transaction?: { __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } } | null };

export type TransactionsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type TransactionsQuery = { __typename?: 'QueryRoot', latestTransactions: Array<{ __typename?: 'Transaction', hash: string, block: { __typename?: 'Block', height: number, createdAt: any }, body: { __typename?: 'TransactionBody', actionsCount: number, memo?: string | null, actions: Array<{ __typename: 'IbcRelay' } | { __typename: 'NotYetSupportedAction' } | { __typename: 'Output' } | { __typename: 'Spend' }>, parameters: { __typename?: 'TransactionParameters', chainId: string, fee: { __typename?: 'Fee', amount: any } } } }> };

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
}
    `;
export const BlockFragmentDoc = gql`
    fragment Block on Block {
  height
  createdAt
  transactions {
    ...Transaction
  }
  transactionsCount
}
    ${TransactionFragmentDoc}`;
export const BlockDocument = gql`
    query Block($id: Int!) {
  block(height: $id) {
    ...Block
  }
}
    ${BlockFragmentDoc}`;
export const BlocksDocument = gql`
    query Blocks($limit: Int!) {
  blocks(selector: {latest: {limit: $limit}}) {
    ...Block
  }
}
    ${BlockFragmentDoc}`;
export const TransactionDocument = gql`
    query Transaction($id: String!) {
  transaction(hash: $id) {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;
export const TransactionsDocument = gql`
    query Transactions($limit: Int!) {
  latestTransactions(limit: $limit) {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;