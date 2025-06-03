// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { TransactionTable } from '@/components'
import { useTransactionUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { IbcStatus } from '@/lib/graphql/generated/types'
import { TransformedPartialTransactionFragment } from '@/lib/types'
import { decodeTransaction, findPrimaryAction } from '@/lib/utils'
import { Props as LatestTransactionsContainerProps } from './latestTransactionsContainer'

interface Props extends LatestTransactionsContainerProps {
    transactions?: TransformedPartialTransactionFragment[]
}

const LatestTransactionsUpdater: FC<Props> = ({ validatorId, ...props }) => {
    const [transactions, setTransactions] = useState<
        TransformedPartialTransactionFragment[] | undefined
    >(props.transactions)

    const [transactionUpdateSubscription] = useTransactionUpdateSubscription({
        // TODO: This is temporary until refactoring done
        pause: Boolean(validatorId),
        variables: { limit: props.limit },
    })

    useEffect(() => {
        if (transactionUpdateSubscription.data?.latestTransactions) {
            const transactionUpdate =
                transactionUpdateSubscription.data.latestTransactions

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
    }, [transactionUpdateSubscription.data?.latestTransactions])

    return <TransactionTable transactions={transactions} {...props} />
}

export default LatestTransactionsUpdater
