// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as VotingPowerPercentagePanelContainerProps } from './votingPowerPercentagePanelContainer'

interface Props extends VotingPowerPercentagePanelContainerProps {
    number: number
}

const VotingPowerPercentagePanelUpdater: FC<Props> = props => {
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
            numberSuffix="%"
            title="Voting power %"
        />
    )
}

export default VotingPowerPercentagePanelUpdater
