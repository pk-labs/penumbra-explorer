// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { ValidatorsPanel } from '@/components'
import { Props as validatorsPanelLoaderProps } from './validatorsPanelLoader'

interface Props extends validatorsPanelLoaderProps {
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

    return <ValidatorsPanel number={number} {...props} />
}

export default ValidatorsPanelUpdater
