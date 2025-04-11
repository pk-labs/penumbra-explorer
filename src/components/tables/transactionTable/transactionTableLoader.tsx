// istanbul ignore file
import { redirect } from 'next/navigation'
import { FC } from 'react'
import { getTransactions } from '@/lib/data'
import { RangeDirection } from '@/lib/graphql/generated/types'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import Pagination from '../../pagination'
import TransactionTable, {
    Props as TransactionTableProps,
} from './transactionTable'

export interface Props
    extends Omit<TransactionTableProps, 'footer' | 'transactions'> {
    limit: number
    pagination?: {
        from?: string
        pathname: string
    }
}

const TransactionTableLoader: FC<Props> = async ({
    limit,
    pagination,
    ...props
}) => {
    let transactions: TransformedPartialTransactionFragment[] | undefined
    let fromNext: string | undefined
    let fromPrev: string | undefined

    if (pagination?.from) {
        const latestTransactions = await getTransactions({
            latest: { limit: 1 },
        })

        if (
            latestTransactions?.length &&
            pagination.from === latestTransactions[0].hash
        ) {
            redirect(pagination.pathname)
        } else {
            transactions = await getTransactions({
                range: {
                    direction: RangeDirection.Next,
                    fromTxHash: pagination.from.toUpperCase(),
                    limit,
                },
            })

            if (transactions?.length) {
                fromNext = transactions[transactions.length - 1].hash

                const prevTransactions = await getTransactions({
                    range: {
                        direction: RangeDirection.Previous,
                        fromTxHash: pagination.from.toUpperCase(),
                        limit,
                    },
                })

                if (prevTransactions?.length) {
                    fromPrev = prevTransactions[0].hash
                }
            } else {
                redirect(pagination.pathname)
            }
        }
    } else {
        transactions = await getTransactions({ latest: { limit } })

        if (pagination && transactions?.length) {
            fromNext = transactions[transactions.length - 1].hash
        }
    }

    return (
        <TransactionTable
            footer={
                pagination ? (
                    <Pagination
                        fromNext={fromNext?.toString()}
                        fromPrev={fromPrev?.toString()}
                        pathname={pagination.pathname}
                    />
                ) : undefined
            }
            transactions={transactions}
            {...props}
        />
    )
}

export default TransactionTableLoader
