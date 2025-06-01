// istanbul ignore file
'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { penumbraImage } from '@/lib/images'
import { Props as ValidatorVotingPowerPanelContainerProps } from './validatorVotingPowerPanelContainer'

interface Props extends ValidatorVotingPowerPanelContainerProps {
    number: number
}

const ValidatorVotingPowerPanelUpdater: FC<Props> = props => {
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
            numberClassName="gap-2"
            numberPrefix={
                <Image alt="UM" height={32} src={penumbraImage} width={32} />
            }
            numberSuffix="UM"
            title="Voting power UM"
        />
    )
}

export default ValidatorVotingPowerPanelUpdater
