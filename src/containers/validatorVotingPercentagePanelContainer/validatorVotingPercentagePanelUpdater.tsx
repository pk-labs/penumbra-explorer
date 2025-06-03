// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as ValidatorVotingPercentagePanelContainerProps } from './validatorVotingPercentagePanelContainer'

interface Props extends ValidatorVotingPercentagePanelContainerProps {
    number: number
}

const ValidatorVotingPercentagePanelUpdater: FC<Props> = props => {
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
            numberSuffix="%"
            title="Voting power %"
            toFixed={2}
        />
    )
}

export default ValidatorVotingPercentagePanelUpdater
