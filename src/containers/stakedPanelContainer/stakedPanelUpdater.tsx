// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { StakedPanel } from '@/components'
import { Props as StakedPanelLoaderProps } from './stakedPanelLoader'

interface Props extends StakedPanelLoaderProps {
    initialNumber?: number
}

const StakedPanelUpdater: FC<Props> = props => {
    const [number] = useState(props.initialNumber)

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

    return <StakedPanel number={number} {...props} />
}

export default StakedPanelUpdater
