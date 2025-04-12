// istanbul ignore file
import { FC } from 'react'
import { TransactionTable, TransactionTableProps } from '@/components'
import { getTransactions } from '@/lib/data'

export interface Props
    extends Omit<TransactionTableProps, 'footer' | 'transactions'> {
    limit: number
}

const LatestTransactionsLoader: FC<Props> = async ({ limit, ...props }) => {
    const transactions = await getTransactions({ latest: { limit } })

    return <TransactionTable transactions={transactions} {...props} />
}

export default LatestTransactionsLoader
