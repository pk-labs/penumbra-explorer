export interface Block {
    date: string
    height: number
    id: string
    proposer: string
    transactions: number
}

export interface Transaction {
    blockHeight: number
    date: string
    hash: string
    id: string
    latestAction: string
    totalActions: number
}
