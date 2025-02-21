import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useBlockQuery(options: Omit<Urql.UseQueryArgs<Types.BlockQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.BlockQuery, Types.BlockQueryVariables>({ query: Types.BlockDocument, ...options });
};
export const BlocksDocument = gql`
    query Blocks($limit: Int!) {
  blocks(selector: {latest: {limit: $limit}}) {
    ...Block
  }
}
    ${BlockFragmentDoc}`;

export function useBlocksQuery(options: Omit<Urql.UseQueryArgs<Types.BlocksQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.BlocksQuery, Types.BlocksQueryVariables>({ query: Types.BlocksDocument, ...options });
};
export const TransactionDocument = gql`
    query Transaction($id: String!) {
  transaction(hash: $id) {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;

export function useTransactionQuery(options: Omit<Urql.UseQueryArgs<Types.TransactionQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.TransactionQuery, Types.TransactionQueryVariables>({ query: Types.TransactionDocument, ...options });
};
export const TransactionsDocument = gql`
    query Transactions($limit: Int!) {
  latestTransactions(limit: $limit) {
    ...Transaction
  }
}
    ${TransactionFragmentDoc}`;

export function useTransactionsQuery(options: Omit<Urql.UseQueryArgs<Types.TransactionsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.TransactionsQuery, Types.TransactionsQueryVariables>({ query: Types.TransactionsDocument, ...options });
};