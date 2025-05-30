// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as ValidatorDefinedPanelContainerProps } from './validatorDefinedPanelContainer'

interface Props extends ValidatorDefinedPanelContainerProps {
    number: number
}

const ValidatorDefinedPanelUpdater: FC<Props> = props => {
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
            {...props}
            number={number}
            numberSuffix={<span className="ml-2">days</span>}
            title="Defined"
        />
    )
}

export default ValidatorDefinedPanelUpdater
