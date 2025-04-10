// istanbul ignore file
import { FC } from 'react'
import { getTransactions } from '@/lib/data'
import TransactionTable, {
    Props as TransactionTableProps,
} from './transactionTable'

export interface Props extends Omit<TransactionTableProps, 'transactions'> {
    limit: number
}

const TransactionTableLoader: FC<Props> = async ({ limit, ...props }) => {
    const transactions = await getTransactions({ latest: { limit } })
    await new Promise(resolve => setTimeout(resolve, 4500))

    return <TransactionTable transactions={transactions} {...props} />
}

export default TransactionTableLoader
