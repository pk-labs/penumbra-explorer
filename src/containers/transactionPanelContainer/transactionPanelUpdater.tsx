// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { TransactionPanel } from '@/components'
import { useTransactionCountUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { Props as TransactionPanelContainerProps } from './transactionPanelContainer'

interface Props extends TransactionPanelContainerProps {
    initialNumber: number
}

const TransactionPanelUpdater: FC<Props> = props => {
    const [number, setNumber] = useState(props.initialNumber)

    const [transactionCountUpdateSubscription] =
        useTransactionCountUpdateSubscription()

    useEffect(() => {
        if (transactionCountUpdateSubscription.data?.transactionCount) {
            setNumber(
                transactionCountUpdateSubscription.data.transactionCount.count
            )
        }
    }, [transactionCountUpdateSubscription.data?.transactionCount])

    return <TransactionPanel number={number} {...props} />
}

export default TransactionPanelUpdater
