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
export const ActiveProposalsDocument = gql`
    query ActiveProposals {
  activeProposals {
    endBlockHeight
    id
    kind
    state
    title
  }
}
    `;

export function useActiveProposalsQuery(options?: Omit<Urql.UseQueryArgs<Types.ActiveProposalsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ActiveProposalsQuery, Types.ActiveProposalsQueryVariables>({ query: Types.ActiveProposalsDocument, ...options });
};
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

export function useActiveValidatorsQuery(options?: Omit<Urql.UseQueryArgs<Types.ActiveValidatorsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ActiveValidatorsQuery, Types.ActiveValidatorsQueryVariables>({ query: Types.ActiveValidatorsDocument, ...options });
};
export const ActiveVotingPowerDocument = gql`
    query ActiveVotingPower {
  validatorsHomepage {
    stakingParameters {
      totalStaked
    }
  }
}
    `;

export function useActiveVotingPowerQuery(options?: Omit<Urql.UseQueryArgs<Types.ActiveVotingPowerQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ActiveVotingPowerQuery, Types.ActiveVotingPowerQueryVariables>({ query: Types.ActiveVotingPowerDocument, ...options });
};
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
  blocks(limit: $limit, filter: $filter) {
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

export function useChainParametersQuery(options?: Omit<Urql.UseQueryArgs<Types.ChainParametersQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ChainParametersQuery, Types.ChainParametersQueryVariables>({ query: Types.ChainParametersDocument, ...options });
};
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

export function useDexBlockExecutionsQuery(options?: Omit<Urql.UseQueryArgs<Types.DexBlockExecutionsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.DexBlockExecutionsQuery, Types.DexBlockExecutionsQueryVariables>({ query: Types.DexBlockExecutionsDocument, ...options });
};
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

export function useDexLiquidityPositionsQuery(options: Omit<Urql.UseQueryArgs<Types.DexLiquidityPositionsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.DexLiquidityPositionsQuery, Types.DexLiquidityPositionsQueryVariables>({ query: Types.DexLiquidityPositionsDocument, ...options });
};
export const DexOpenPositionsDocument = gql`
    query DexOpenPositions {
  dexStats {
    openPositions
  }
}
    `;

export function useDexOpenPositionsQuery(options?: Omit<Urql.UseQueryArgs<Types.DexOpenPositionsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.DexOpenPositionsQuery, Types.DexOpenPositionsQueryVariables>({ query: Types.DexOpenPositionsDocument, ...options });
};
export const DexTotalExecutionsDocument = gql`
    query DexTotalExecutions {
  dexStats {
    totalExecutions
  }
}
    `;

export function useDexTotalExecutionsQuery(options?: Omit<Urql.UseQueryArgs<Types.DexTotalExecutionsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.DexTotalExecutionsQuery, Types.DexTotalExecutionsQueryVariables>({ query: Types.DexTotalExecutionsDocument, ...options });
};
export const GovParametersDocument = gql`
    query GovParameters {
  governanceParameters {
    depositAmount
    passingThreshold
    proposalDuration
    slashingThreshold
    validQuorum
  }
}
    `;

export function useGovParametersQuery(options?: Omit<Urql.UseQueryArgs<Types.GovParametersQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.GovParametersQuery, Types.GovParametersQueryVariables>({ query: Types.GovParametersDocument, ...options });
};
export const IbcStatsDocument = gql`
    query IbcStats($clientId: String) {
  ibcStats(clientId: $clientId) {
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

export function useIbcStatsQuery(options?: Omit<Urql.UseQueryArgs<Types.IbcStatsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.IbcStatsQuery, Types.IbcStatsQueryVariables>({ query: Types.IbcStatsDocument, ...options });
};
export const MinValidatorStakeDocument = gql`
    query MinValidatorStake {
  validatorsHomepage {
    stakingParameters {
      minValidatorStake
    }
  }
}
    `;

export function useMinValidatorStakeQuery(options?: Omit<Urql.UseQueryArgs<Types.MinValidatorStakeQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.MinValidatorStakeQuery, Types.MinValidatorStakeQueryVariables>({ query: Types.MinValidatorStakeDocument, ...options });
};
export const PastProposalsDocument = gql`
    query PastProposals($limit: CollectionLimit!) {
  pastProposals(limit: $limit) {
    items {
      endBlockHeight
      endTimestamp
      id
      kind
      outcome
      state
      title
      totalVotes
    }
    total
  }
}
    `;

export function usePastProposalsQuery(options: Omit<Urql.UseQueryArgs<Types.PastProposalsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.PastProposalsQuery, Types.PastProposalsQueryVariables>({ query: Types.PastProposalsDocument, ...options });
};
export const ProposalDocument = gql`
    query Proposal($id: Int!) {
  proposalDetail(id: $id) {
    depositAmount
    description
    id
    kind
    outcome
    payload
    state
    title
  }
}
    `;

export function useProposalQuery(options: Omit<Urql.UseQueryArgs<Types.ProposalQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ProposalQuery, Types.ProposalQueryVariables>({ query: Types.ProposalDocument, ...options });
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
    ... on ValidatorSearchResults {
      items {
        id
        displayName
      }
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
  transactions(limit: $limit, filter: $filter) {
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
export const ValidatorActiveSinceDocument = gql`
    query ValidatorActiveSince($id: String!) {
  validatorDetails(id: $id) {
    activeSince
  }
}
    `;

export function useValidatorActiveSinceQuery(options: Omit<Urql.UseQueryArgs<Types.ValidatorActiveSinceQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ValidatorActiveSinceQuery, Types.ValidatorActiveSinceQueryVariables>({ query: Types.ValidatorActiveSinceDocument, ...options });
};
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

export function useValidatorBlocksQuery(options: Omit<Urql.UseQueryArgs<Types.ValidatorBlocksQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ValidatorBlocksQuery, Types.ValidatorBlocksQueryVariables>({ query: Types.ValidatorBlocksDocument, ...options });
};
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

export function useValidatorParametersQuery(options?: Omit<Urql.UseQueryArgs<Types.ValidatorParametersQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ValidatorParametersQuery, Types.ValidatorParametersQueryVariables>({ query: Types.ValidatorParametersDocument, ...options });
};
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

export function useValidatorQuery(options: Omit<Urql.UseQueryArgs<Types.ValidatorQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ValidatorQuery, Types.ValidatorQueryVariables>({ query: Types.ValidatorDocument, ...options });
};
export const ValidatorVotingPercentageDocument = gql`
    query ValidatorVotingPercentage($id: String!) {
  validatorDetails(id: $id) {
    votingPowerActivePercentage
  }
}
    `;

export function useValidatorVotingPercentageQuery(options: Omit<Urql.UseQueryArgs<Types.ValidatorVotingPercentageQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ValidatorVotingPercentageQuery, Types.ValidatorVotingPercentageQueryVariables>({ query: Types.ValidatorVotingPercentageDocument, ...options });
};
export const ValidatorVotingPowerDocument = gql`
    query ValidatorVotingPower($id: String!) {
  validatorDetails(id: $id) {
    state
    votingPower
  }
}
    `;

export function useValidatorVotingPowerQuery(options: Omit<Urql.UseQueryArgs<Types.ValidatorVotingPowerQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ValidatorVotingPowerQuery, Types.ValidatorVotingPowerQueryVariables>({ query: Types.ValidatorVotingPowerDocument, ...options });
};
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

export function useValidatorsQuery(options?: Omit<Urql.UseQueryArgs<Types.ValidatorsQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.ValidatorsQuery, Types.ValidatorsQueryVariables>({ query: Types.ValidatorsDocument, ...options });
};
export const VotesDocument = gql`
    query Votes($proposalId: Int!, $limit: CollectionLimit!) {
  proposalDetail(id: $proposalId) {
    votes(limit: $limit) {
      items {
        effectiveVotingPower
        id
        name
        txHash
        vote
        votedAt
        votingPowerPercentage
      }
      total
    }
  }
}
    `;

export function useVotesQuery(options: Omit<Urql.UseQueryArgs<Types.VotesQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.VotesQuery, Types.VotesQueryVariables>({ query: Types.VotesDocument, ...options });
};
export const VotingEndDocument = gql`
    query VotingEnd($proposalId: Int!) {
  proposalDetail(id: $proposalId) {
    state
    votingEndedBlockHeight
    votingEndedTimestamp
  }
}
    `;

export function useVotingEndQuery(options: Omit<Urql.UseQueryArgs<Types.VotingEndQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.VotingEndQuery, Types.VotingEndQueryVariables>({ query: Types.VotingEndDocument, ...options });
};
export const VotingDocument = gql`
    query Voting($proposalId: Int!) {
  proposalDetail(id: $proposalId) {
    abstainVotes
    abstainVotesPercentage
    noVotes
    noVotesPercentage
    outcome
    quorum
    state
    totalVotes
    yesVotes
    yesVotesPercentage
  }
}
    `;

export function useVotingQuery(options: Omit<Urql.UseQueryArgs<Types.VotingQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.VotingQuery, Types.VotingQueryVariables>({ query: Types.VotingDocument, ...options });
};
export const VotingStartDocument = gql`
    query VotingStart($proposalId: Int!) {
  proposalDetail(id: $proposalId) {
    votingStartedBlockHeight
    votingStartedTimestamp
  }
}
    `;

export function useVotingStartQuery(options: Omit<Urql.UseQueryArgs<Types.VotingStartQueryVariables>, 'query'>) {
  return Urql.useQuery<Types.VotingStartQuery, Types.VotingStartQueryVariables>({ query: Types.VotingStartDocument, ...options });
};
export const BlockUpdateDocument = gql`
    subscription BlockUpdate {
  latestBlocks(limit: 1) {
    height
    createdAt
    transactionsCount
  }
}
    `;

export function useBlockUpdateSubscription<TData = Types.BlockUpdateSubscription>(options?: Omit<Urql.UseSubscriptionArgs<Types.BlockUpdateSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<Types.BlockUpdateSubscription, TData>) {
  return Urql.useSubscription<Types.BlockUpdateSubscription, TData, Types.BlockUpdateSubscriptionVariables>({ query: Types.BlockUpdateDocument, ...options }, handler);
};
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

export function useChainParametersUpdateSubscription<TData = Types.ChainParametersUpdateSubscription>(options?: Omit<Urql.UseSubscriptionArgs<Types.ChainParametersUpdateSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<Types.ChainParametersUpdateSubscription, TData>) {
  return Urql.useSubscription<Types.ChainParametersUpdateSubscription, TData, Types.ChainParametersUpdateSubscriptionVariables>({ query: Types.ChainParametersUpdateDocument, ...options }, handler);
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
export const ValidatorBlockUpdateDocument = gql`
    subscription ValidatorBlockUpdate($id: String!) {
  validatorBlocks(validatorId: $id) {
    blockHeight
    signed
  }
}
    `;

export function useValidatorBlockUpdateSubscription<TData = Types.ValidatorBlockUpdateSubscription>(options: Omit<Urql.UseSubscriptionArgs<Types.ValidatorBlockUpdateSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<Types.ValidatorBlockUpdateSubscription, TData>) {
  return Urql.useSubscription<Types.ValidatorBlockUpdateSubscription, TData, Types.ValidatorBlockUpdateSubscriptionVariables>({ query: Types.ValidatorBlockUpdateDocument, ...options }, handler);
};