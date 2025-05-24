// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as ValidatorsPanelLoaderProps } from './validatorsPanelLoader'

interface Props extends ValidatorsPanelLoaderProps {
    initialNumber?: number
}

const ValidatorsPanelUpdater: FC<Props> = props => {
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
            className={props.className}
            number={number}
            numberSuffix={
                <span className="text-text-secondary text-2xl">/100</span>
            }
            title="Active validators / Validators limit"
        />
    )
}

export default ValidatorsPanelUpdater
