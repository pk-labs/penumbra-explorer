import * as Types from './types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const BlockFragmentDoc = gql`
    fragment Block on Block {
  height
  createdAt
  transactionsCount
}
    `;
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