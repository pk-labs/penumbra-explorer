// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as ActiveValidatorsPanelContainerProps } from './activeValidatorsPanelContainer'

interface Props extends ActiveValidatorsPanelContainerProps {
    limit: number
    number: number
}

const ActiveValidatorsPanelUpdater: FC<Props> = props => {
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
            numberSuffix={
                <span className="text-text-secondary text-2xl">
                    /{props.limit}
                </span>
            }
            title="Active validators / Validators limit"
        />
    )
}

export default ActiveValidatorsPanelUpdater
