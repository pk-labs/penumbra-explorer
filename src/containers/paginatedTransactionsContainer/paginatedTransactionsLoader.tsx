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
    clientId?: string
    length: number
    offset: number
    pathname: string
}

const PaginatedTransactionsLoader: FC<Props> = async ({
    clientId,
    length,
    offset,
    pathname,
    ...props
}) => {
    const { total, transactions } = await getTransactions(
        { length, offset },
        { clientId }
    )

    const page = offset / length + 1
    const totalPages = Math.ceil(total / length)

    return (
        <TransactionTable
            emptyStateMessage="This chain contains no transactions"
            footer={
                <Pagination
                    page={page}
                    pathname={pathname}
                    totalPages={totalPages}
                />
            }
            transactions={transactions}
            {...props}
        />
    )
}

export default PaginatedTransactionsLoader
