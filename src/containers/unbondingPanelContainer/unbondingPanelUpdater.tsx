// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { UnbondingPanel } from '@/components'
import { Props as UnbondingPanelLoaderProps } from './unbondingPanelLoader'

interface Props extends UnbondingPanelLoaderProps {
    initialNumber?: number
}

const UnbondingPanelUpdater: FC<Props> = props => {
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

    return <UnbondingPanel number={number} {...props} />
}

export default UnbondingPanelUpdater
