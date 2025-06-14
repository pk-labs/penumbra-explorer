// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { NumberPanel } from '@/components'
import { useTicker } from '@/lib/hooks'
import { Props as DexPositionPanelContainerProps } from './dexPositionPanelContainer'

interface Props extends DexPositionPanelContainerProps {
    number: number
}

const DexPositionPanelUpdater: FC<Props> = props => {
    const lastTick = useTicker()
    const [number, setNumber] = useState(props.number)

    useEffect(() => {
        if (lastTick.second() % 9 === 0) {
            setNumber(prev => prev + 1)
        }
    }, [lastTick])

    return (
        <NumberPanel
            className={props.className}
            number={number}
            title="Total open positions"
        />
    )
}

export default DexPositionPanelUpdater
