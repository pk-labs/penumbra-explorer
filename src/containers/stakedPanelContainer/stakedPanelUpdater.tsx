// istanbul ignore file
'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { NumberPanel } from '@/components'
import { penumbra } from '@/lib/images'
import { Props as StakedPanelContainerProps } from './stakedPanelContainer'

interface Props extends StakedPanelContainerProps {
    initialNumber?: number
}

const StakedPanelUpdater: FC<Props> = props => {
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
            numberClassName="gap-2"
            numberPrefix={
                <Image alt="UM" height={32} src={penumbra} width={32} />
            }
            numberSuffix="UM"
            title="Total staked"
            {...props}
        />
    )
}

export default StakedPanelUpdater
