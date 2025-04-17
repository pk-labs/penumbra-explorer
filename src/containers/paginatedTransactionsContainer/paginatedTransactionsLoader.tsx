// istanbul ignore file
import { redirect } from 'next/navigation'
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
    const { total, transactions } = await getTransactions({ length, offset })

    if (!transactions?.length) {
        redirect(pathname)
    }

    const page = offset / length + 1
    const totalPages = Math.ceil(total / length)

    return (
        <TransactionTable
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
