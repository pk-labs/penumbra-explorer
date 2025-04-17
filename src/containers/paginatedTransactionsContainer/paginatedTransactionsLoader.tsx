// istanbul ignore file
import { FC } from 'react'
import {
    Pagination,
    TransactionTable,
    TransactionTableProps,
} from '@/components'
import { getTransactions } from '@/lib/data'

export interface Props
    extends Omit<TransactionTableProps, 'footer' | 'transactions'> {
    length: number
    offset: number
    pathname: string
}

const PaginatedTransactionsLoader: FC<Props> = async ({
    length,
    offset,
    pathname,
    ...props
}) => {
    const transactions = await getTransactions({ length, offset })

    return (
        <TransactionTable
            footer={<Pagination pathname={pathname} />}
            transactions={transactions}
            {...props}
        />
    )
}

export default PaginatedTransactionsLoader
