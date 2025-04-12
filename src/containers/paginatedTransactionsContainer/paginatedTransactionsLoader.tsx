// istanbul ignore file
import { redirect } from 'next/navigation'
import { FC } from 'react'
import {
    Pagination,
    TransactionTable,
    TransactionTableProps,
} from '@/components'
import { getTransactions } from '@/lib/data'
import { RangeDirection } from '@/lib/graphql/generated/types'
import { TransformedPartialTransactionFragment } from '@/lib/types'

export interface Props
    extends Omit<TransactionTableProps, 'footer' | 'transactions'> {
    from?: string
    limit: number
    pathname: string
}

const PaginatedTransactionsLoader: FC<Props> = async ({
    from,
    limit,
    pathname,
    ...props
}) => {
    let transactions: TransformedPartialTransactionFragment[] | undefined
    let fromNext: string | undefined
    let fromPrev: string | undefined

    if (from) {
        const latestTransactions = await getTransactions({
            latest: { limit: 1 },
        })

        if (latestTransactions?.length && from === latestTransactions[0].hash) {
            redirect(pathname)
        } else {
            transactions = await getTransactions({
                range: {
                    direction: RangeDirection.Next,
                    fromTxHash: from.toUpperCase(),
                    limit,
                },
            })

            if (transactions?.length) {
                fromNext = transactions[transactions.length - 1].hash

                const prevTransactions = await getTransactions({
                    range: {
                        direction: RangeDirection.Previous,
                        fromTxHash: from.toUpperCase(),
                        limit,
                    },
                })

                if (prevTransactions?.length) {
                    fromPrev = prevTransactions[0].hash
                }
            } else {
                redirect(pathname)
            }
        }
    } else {
        transactions = await getTransactions({ latest: { limit } })

        if (transactions?.length) {
            fromNext = transactions[transactions.length - 1].hash
        }
    }

    return (
        <TransactionTable
            footer={
                <Pagination
                    fromNext={fromNext?.toString()}
                    fromPrev={fromPrev?.toString()}
                    pathname={pathname}
                />
            }
            transactions={transactions}
            {...props}
        />
    )
}

export default PaginatedTransactionsLoader
