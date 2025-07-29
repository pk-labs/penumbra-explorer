// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe, throttle } from 'wonka'
import { Pagination, TransactionTable } from '@/components'
import {
    IbcStatus,
    TransactionUpdateSubscription,
    TransactionUpdateSubscriptionVariables,
} from '@/lib/graphql/generated/types'
import transactionSubscription from '@/lib/graphql/subscriptions/transactionSubscription.graphql'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import { decodeTransaction, findPrimaryAction } from '@/lib/utils'
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
        >(transactionSubscription, { limit: limit.length })

        const sub = pipe(
            source,
            throttle(() => 1000),
            subscribe(result => {
                const transactionUpdate = result.data?.latestTransactions

                if (transactionUpdate) {
                    setTransactions(prev => {
                        if (
                            !prev ||
                            prev.some(
                                tx =>
                                    transactionUpdate.hash.toLowerCase() ===
                                    tx.hash
                            )
                        ) {
                            return prev
                        }

                        let primaryAction
                        let actionCount

                        try {
                            const decoded = decodeTransaction(
                                transactionUpdate.raw
                            )
                            primaryAction = findPrimaryAction(decoded)
                            actionCount = decoded.body?.actions.length
                        } catch (e) {
                            // istanbul ignore next
                            console.error(e)
                        }

                        return [
                            {
                                actionCount: actionCount ?? 0,
                                blockHeight: transactionUpdate.id,
                                hash: transactionUpdate.hash.toLowerCase(),
                                primaryAction,
                                raw: transactionUpdate.raw,
                                status: IbcStatus.Completed, // FIXME: Query ibcStatus
                                timestamp: 0, // FIXME: Query block.createdAt
                            },
                            ...prev.slice(0, -1),
                        ]
                    })
                }
            })
        )

        return () => sub.unsubscribe()
    }, [client, limit.length, subscription])

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
