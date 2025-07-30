// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe } from 'wonka'
import { Pagination, TransactionTable } from '@/components'
import {
    IbcStatus,
    TransactionUpdateSubscription,
    TransactionUpdateSubscriptionVariables,
} from '@/lib/graphql/generated/types'
import transactionSubscription from '@/lib/graphql/subscriptions/transactionSubscription.graphql'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import {
    decodeTransaction,
    findPrimaryAction,
    throttleStream,
} from '@/lib/utils'
import { Props as TransactionTableContainerProps } from './transactionTableContainer'

interface Props extends TransactionTableContainerProps {
    total: number
    transactions?: TransformedPartialTransactionFragment[]
}

const TransactionTableUpdater: FC<Props> = ({
    filter,
    limit,
    pagination,
    subscription,
    total,
    ...props
}) => {
    const client = useClient()
    const [transactions, setTransactions] = useState(props.transactions)

    useEffect(() => {
        if (!subscription) {
            return
        }

        const source = client.subscription<
            TransactionUpdateSubscription,
            TransactionUpdateSubscriptionVariables
        >(transactionSubscription, {})

        const sub = pipe(
            throttleStream(source, 1000, 10),
            subscribe(results => {
                const latestTransactions: TransformedPartialTransactionFragment[] =
                    []

                for (const result of results) {
                    const transaction = result.data?.latestTransactions

                    if (transaction) {
                        let primaryAction
                        let actionCount

                        try {
                            const decoded = decodeTransaction(transaction.raw)
                            primaryAction = findPrimaryAction(decoded)
                            actionCount = decoded.body?.actions.length
                        } catch (e) {
                            // istanbul ignore next
                            console.error(e)
                        }

                        latestTransactions.unshift({
                            actionCount: actionCount ?? 0,
                            blockHeight: transaction.id,
                            hash: transaction.hash.toLowerCase(),
                            primaryAction,
                            raw: transaction.raw,
                            status: IbcStatus.Completed, // FIXME: Query ibcStatus
                            timestamp: 0, // FIXME: Query block.createdAt
                        })
                    }
                }

                if (latestTransactions.length) {
                    setTransactions(prev => {
                        const latestTransactionHashes = new Set(
                            latestTransactions.map(
                                transaction => transaction.hash
                            )
                        )

                        prev?.forEach(prevTransaction => {
                            if (
                                !latestTransactionHashes.has(
                                    prevTransaction.hash
                                )
                            ) {
                                latestTransactions.push(prevTransaction)
                            }
                        })

                        return latestTransactions.slice(0, 10)
                    })
                }
            })
        )

        return () => sub.unsubscribe()
    }, [client, subscription])

    return (
        <TransactionTable
            {...props}
            footer={
                pagination ? (
                    <Pagination
                        page={(limit.offset ?? 0) / limit.length + 1}
                        totalPages={Math.ceil(total / limit.length)}
                    />
                ) : undefined
            }
            transactions={transactions}
        />
    )
}

export default TransactionTableUpdater
