// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as UnbondingPanelContainerProps } from './unbondingPanelContainer'

interface Props extends UnbondingPanelContainerProps {
    initialNumber: number
}

const UnbondingPanelUpdater: FC<Props> = ({ initialNumber, ...props }) => {
    const [number] = useState(initialNumber)

    // const [transactionCountUpdateSubscription] =
    //     useTransactionCountUpdateSubscription()
    //
    // useEffect(() => {
    //     if (transactionCountUpdateSubscription.data?.transactionCount) {
    //         setNumber(
    //             transactionCountUpdateSubscription.data.transactionCount.count
    //         )
    //     }
    // }, [transactionCountUpdateSubscription.data?.transactionCount])

    return (
        <NumberPanel
            number={number}
            numberPrefix="~"
            numberSuffix={<span className="ml-2">days</span>}
            title="Unbonding delay"
            {...props}
        />
    )
}

export default UnbondingPanelUpdater
