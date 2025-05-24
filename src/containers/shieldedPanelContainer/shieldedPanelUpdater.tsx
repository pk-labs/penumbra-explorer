// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { ShieldedPanel } from '@/components'
import { useTotalShieldedVolumeUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { Props as ShieldedPanelContainerProps } from './shieldedPanelContainer'

interface Props extends ShieldedPanelContainerProps {
    initialNumber: number
}

const ShieldedPanelUpdater: FC<Props> = props => {
    const [number, setNumber] = useState(props.initialNumber)

    const [totalShieldedVolumeUpdateSubscription] =
        useTotalShieldedVolumeUpdateSubscription()

    useEffect(() => {
        if (
            typeof totalShieldedVolumeUpdateSubscription.data
                ?.totalShieldedVolume.value === 'string'
        ) {
            setNumber(
                Number(
                    totalShieldedVolumeUpdateSubscription.data
                        .totalShieldedVolume.value
                )
            )
        }
    }, [totalShieldedVolumeUpdateSubscription.data?.totalShieldedVolume.value])

    return <ShieldedPanel number={number} {...props} />
}

export default ShieldedPanelUpdater
