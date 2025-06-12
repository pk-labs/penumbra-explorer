// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { Pagination, TransactionTable } from '@/components'
import { useTransactionUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { IbcStatus } from '@/lib/graphql/generated/types'
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
    const [transactions, setTransactions] = useState(props.transactions)
    const [transactionUpdateSubscription] = useTransactionUpdateSubscription({
        pause: !subscription,
        variables: { limit: limit.length },
    })
    const transactionUpdate =
        transactionUpdateSubscription.data?.latestTransactions

    useEffect(() => {
        if (transactionUpdate) {
            setTransactions(prev => {
                if (
                    !prev ||
                    prev.some(
                        tx => transactionUpdate.hash.toLowerCase() === tx.hash
                    )
                ) {
                    return prev
                }

                let primaryAction
                let actionCount

                try {
                    const decoded = decodeTransaction(transactionUpdate.raw)
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
                        initialTimeAgo: '',
                        primaryAction,
                        raw: transactionUpdate.raw,
                        status: IbcStatus.Completed, // FIXME: Query ibcStatus
                        timestamp: 0, // FIXME: Query block.createdAt
                    },
                    ...prev.slice(0, -1),
                ]
            })
        }
    }, [transactionUpdate])

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
