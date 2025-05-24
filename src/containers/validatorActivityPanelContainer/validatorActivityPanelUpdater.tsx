// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as ValidatorActivityPanelContainerProps } from './validatorActivityPanelContainer'

interface Props extends ValidatorActivityPanelContainerProps {
    initialNumber: number
}

const ValidatorActivityPanelUpdater: FC<Props> = props => {
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

    return (
        <NumberPanel
            number={number}
            numberSuffix={<span className="ml-2">days</span>}
            title="Active since"
            {...props}
        />
    )
}

export default ValidatorActivityPanelUpdater
