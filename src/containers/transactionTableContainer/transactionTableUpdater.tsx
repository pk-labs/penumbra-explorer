// istanbul ignore file
'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe } from 'wonka'
import { Pagination, TransactionTable } from '@/components'
import { animationFrameMs } from '@/lib/constants'
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
    const queueRef = useRef<TransformedPartialTransactionFragment[]>([])
    const animationFrameRef = useRef<number>(undefined)
    const updateTimestampRef = useRef(0)
    const [transactions, setTransactions] = useState(props.transactions ?? [])

    const hashesRef = useRef(
        new Set(transactions.map(transaction => transaction.hash))
    )

    useEffect(() => {
        if (!subscription) {
            return
        }

        const source = client.subscription<
            TransactionUpdateSubscription,
            TransactionUpdateSubscriptionVariables
        >(transactionSubscription, {})

        const { unsubscribe } = pipe(
            source,
            subscribe(result => {
                const transaction = result.data?.latestTransactions

                if (
                    transaction &&
                    !hashesRef.current.has(transaction.hash.toLowerCase())
                ) {
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

                    queueRef.current.push({
                        actionCount: actionCount ?? 0,
                        blockHeight: transaction.id,
                        hash: transaction.hash.toLowerCase(),
                        primaryAction,
                        raw: transaction.raw,
                        status: IbcStatus.Completed, // FIXME: Query ibcStatus
                        timestamp: 0, // FIXME: Query block.createdAt
                    })
                }
            })
        )

        return () => unsubscribe()
    }, [client, subscription])

    useEffect(() => {
        const animationLoop = () => {
            if (queueRef.current.length > 0) {
                const now = performance.now()

                if (now - updateTimestampRef.current >= animationFrameMs) {
                    const transaction = queueRef.current.shift()

                    if (transaction) {
                        hashesRef.current.add(transaction.hash)

                        setTransactions(prev => {
                            const hashToBeRemoved = prev.at(-1)?.hash

                            if (hashToBeRemoved) {
                                hashesRef.current.delete(hashToBeRemoved)
                            }

                            return [transaction, ...prev].slice(0, 10)
                        })

                        updateTimestampRef.current = now
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(animationLoop)
        }

        animationFrameRef.current = requestAnimationFrame(animationLoop)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

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
