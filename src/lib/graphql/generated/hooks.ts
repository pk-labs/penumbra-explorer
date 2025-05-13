import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useBlockQuery(options: Omit<Urql.UseQueryArgs<Types.BlockQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.BlockQuery, Types.BlockQueryVariables>({ query: Types.BlockDocument, ...options });
};
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

export function useBlocksQuery(options: Omit<Urql.UseQueryArgs<Types.BlocksQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.BlocksQuery, Types.BlocksQueryVariables>({ query: Types.BlocksDocument, ...options });
};
export const IbcStatsDocument = gql`
    query IbcStats($clientId: String, $timePeriod: TimePeriod) {
  ibcStats(clientId: $clientId, timePeriod: $timePeriod) {
    clientId
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

export function useIbcStatsQuery(options?: Omit<Urql.UseQueryArgs<Types.IbcStatsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.IbcStatsQuery, Types.IbcStatsQueryVariables>({ query: Types.IbcStatsDocument, ...options });
};
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

export function useSearchQuery(options: Omit<Urql.UseQueryArgs<Types.SearchQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.SearchQuery, Types.SearchQueryVariables>({ query: Types.SearchDocument, ...options });
};
export const StatsDocument = gql`
    query Stats {
  stats {
    totalTransactionsCount
  }
}
    `;

export function useStatsQuery(options?: Omit<Urql.UseQueryArgs<Types.StatsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.StatsQuery, Types.StatsQueryVariables>({ query: Types.StatsDocument, ...options });
};
export const TotalShieldedVolumeDocument = gql`
    query TotalShieldedVolume {
  ibcTotalShieldedVolume {
    value
  }
}
    `;

export function useTotalShieldedVolumeQuery(options?: Omit<Urql.UseQueryArgs<Types.TotalShieldedVolumeQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.TotalShieldedVolumeQuery, Types.TotalShieldedVolumeQueryVariables>({ query: Types.TotalShieldedVolumeDocument, ...options });
};
export const TransactionDocument = gql`
    query Transaction($hash: String!) {
  transaction(hash: $hash) {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;

export function useTransactionQuery(options: Omit<Urql.UseQueryArgs<Types.TransactionQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.TransactionQuery, Types.TransactionQueryVariables>({ query: Types.TransactionDocument, ...options });
};
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

export function useTransactionsQuery(options: Omit<Urql.UseQueryArgs<Types.TransactionsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.TransactionsQuery, Types.TransactionsQueryVariables>({ query: Types.TransactionsDocument, ...options });
};
export const BlockUpdateDocument = gql`
    subscription BlockUpdate($limit: Int!) {
  latestBlocks(limit: $limit) {
    height
    createdAt
    transactionsCount
  }
}
    `;

export function useBlockUpdateSubscription<TData = Types.BlockUpdateSubscription>(options: Omit<Urql.UseSubscriptionArgs<Types.BlockUpdateSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<Types.BlockUpdateSubscription, TData>) {
  return Urql.useSubscription<Types.BlockUpdateSubscription, TData, Types.BlockUpdateSubscriptionVariables>({ query: Types.BlockUpdateDocument, ...options }, handler);
};
export const TotalShieldedVolumeUpdateDocument = gql`
    subscription TotalShieldedVolumeUpdate {
  totalShieldedVolume {
    value
  }
}
    `;

export function useTotalShieldedVolumeUpdateSubscription<TData = Types.TotalShieldedVolumeUpdateSubscription>(options?: Omit<Urql.UseSubscriptionArgs<Types.TotalShieldedVolumeUpdateSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<Types.TotalShieldedVolumeUpdateSubscription, TData>) {
  return Urql.useSubscription<Types.TotalShieldedVolumeUpdateSubscription, TData, Types.TotalShieldedVolumeUpdateSubscriptionVariables>({ query: Types.TotalShieldedVolumeUpdateDocument, ...options }, handler);
};
export const TransactionCountUpdateDocument = gql`
    subscription TransactionCountUpdate {
  transactionCount {
    count
  }
}
    `;

export function useTransactionCountUpdateSubscription<TData = Types.TransactionCountUpdateSubscription>(options?: Omit<Urql.UseSubscriptionArgs<Types.TransactionCountUpdateSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<Types.TransactionCountUpdateSubscription, TData>) {
  return Urql.useSubscription<Types.TransactionCountUpdateSubscription, TData, Types.TransactionCountUpdateSubscriptionVariables>({ query: Types.TransactionCountUpdateDocument, ...options }, handler);
};
export const TransactionUpdateDocument = gql`
    subscription TransactionUpdate($limit: Int!) {
  latestTransactions(limit: $limit) {
    hash
    id
    raw
  }
}
    `;

export function useTransactionUpdateSubscription<TData = Types.TransactionUpdateSubscription>(options: Omit<Urql.UseSubscriptionArgs<Types.TransactionUpdateSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<Types.TransactionUpdateSubscription, TData>) {
  return Urql.useSubscription<Types.TransactionUpdateSubscription, TData, Types.TransactionUpdateSubscriptionVariables>({ query: Types.TransactionUpdateDocument, ...options }, handler);
};