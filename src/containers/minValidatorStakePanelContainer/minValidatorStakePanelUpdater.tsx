// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as MinValidatorStakePanelContainerProps } from './minValidatorStakePanelContainer'

interface Props extends MinValidatorStakePanelContainerProps {
    number: number
}

const MinValidatorStakePanelUpdater: FC<Props> = props => {
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
            numberClassName="gap-2"
            numberSuffix="UM"
            title="Min validator stake"
        />
    )
}

export default MinValidatorStakePanelUpdater
