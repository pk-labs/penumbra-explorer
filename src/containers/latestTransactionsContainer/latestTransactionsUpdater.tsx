// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { TransactionTable } from '@/components'
import { useTransactionUpdateSubscription } from '@/lib/graphql/generated/hooks'
import {
    TransformedPartialTransactionFragment,
    TransformedTransactionUpdate,
} from '@/lib/types'
import { decodeTransaction, findPrimaryAction } from '@/lib/utils'
import { Props as LatestTransactionsLoaderProps } from './latestTransactionsLoader'

interface Props extends LatestTransactionsLoaderProps {
    initialTransactions?: TransformedPartialTransactionFragment[]
}

const LatestTransactionsUpdater: FC<Props> = props => {
    const [transactions, setTransactions] = useState<
        | Array<
              | TransformedPartialTransactionFragment
              | TransformedTransactionUpdate
          >
        | undefined
    >(props.initialTransactions)

    const [transactionUpdateSubscription] = useTransactionUpdateSubscription({
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

                const newTransactions = [
                    {
                        actionCount: actionCount ?? 0,
                        block: { height: transactionUpdate.id },
                        hash: transactionUpdate.hash.toLowerCase(),
                        primaryAction,
                        raw: transactionUpdate.raw,
                    },
                    ...prev.slice(0, -1),
                ]

                console.log(newTransactions)

                return newTransactions

                // return [
                //     {
                //         ...transactionUpdate,
                //         actionCount: actionCount ?? 0,
                //         block: { height: transactionUpdate.id },
                //         hash: transactionUpdate.hash.toLowerCase(),
                //         primaryAction,
                //     },
                //     ...prev.slice(0, -1),
                // ]
            })
        }
    }, [transactionUpdateSubscription.data?.latestTransactions])

    return <TransactionTable transactions={transactions} {...props} />
}

export default LatestTransactionsUpdater
