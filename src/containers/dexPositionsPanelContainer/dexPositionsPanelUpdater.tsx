// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as DexPositionsPanelContainerProps } from './dexPositionsPanelContainer'

interface Props extends DexPositionsPanelContainerProps {
    number: number
}

const DexPositionsPanelUpdater: FC<Props> = props => {
    const [number] = useState(props.number)

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
            className={props.className}
            number={number}
            title="Total open positions"
        />
    )
}

export default DexPositionsPanelUpdater
