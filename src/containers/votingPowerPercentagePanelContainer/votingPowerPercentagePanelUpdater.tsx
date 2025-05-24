// istanbul ignore file
'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { penumbra } from '@/lib/images'
import { Props as VotingPowerUmPanelContainerProps } from './votingPowerPercentagePanelContainer'

interface Props extends VotingPowerUmPanelContainerProps {
    initialNumber: number
}

const VotingPowerPercentagePanelUpdater: FC<Props> = props => {
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
            numberSuffix="% "
            title="Voting power %"
            {...props}
        />
    )
}

export default VotingPowerPercentagePanelUpdater
