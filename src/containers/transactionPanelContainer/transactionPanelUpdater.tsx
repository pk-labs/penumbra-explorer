// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { TransactionPanel } from '@/components'
import { useTransactionCountUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { Props as TransactionPanelContainerProps } from './transactionPanelContainer'

interface Props extends TransactionPanelContainerProps {
    number: number
}

const TransactionPanelUpdater: FC<Props> = props => {
    const [number, setNumber] = useState(props.number)

    const [transactionCountUpdateSubscription] =
        useTransactionCountUpdateSubscription()

    useEffect(() => {
        if (transactionCountUpdateSubscription.data?.transactionCount) {
            setNumber(
                transactionCountUpdateSubscription.data.transactionCount.count
            )
        }
    }, [transactionCountUpdateSubscription.data?.transactionCount])

    return <TransactionPanel {...props} number={number} />
}

export default TransactionPanelUpdater
