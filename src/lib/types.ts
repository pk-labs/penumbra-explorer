import { BlocksQuery } from './graphql/generated/types'

export type Block = BlocksQuery['blocks'][number]

export interface Transaction {
    blockHeight: number
    date: string
    hash: string
    id: string
    latestAction: string
    totalActions: number
}
