// istanbul ignore file
'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { penumbra } from '@/lib/images'
import { Props as VotingPowerUmPanelContainerProps } from './votingPowerUmPanelContainer'

interface Props extends VotingPowerUmPanelContainerProps {
    number: number
}

const VotingPowerUmPanelUpdater: FC<Props> = props => {
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
            numberPrefix={
                <Image alt="UM" height={32} src={penumbra} width={32} />
            }
            numberSuffix="UM"
            title="Voting power UM"
        />
    )
}

export default VotingPowerUmPanelUpdater
