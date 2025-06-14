// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { NumberPanel } from '@/components'
import { useTicker } from '@/lib/hooks'
import { Props as DexExecutionPanelContainerProps } from './dexExecutionPanelContainer'

interface Props extends DexExecutionPanelContainerProps {
    number: number
}

const DexExecutionPanelUpdater: FC<Props> = props => {
    const lastTick = useTicker()
    const [number, setNumber] = useState(props.number)

    useEffect(() => {
        if (lastTick.second() % 5 === 0) {
            setNumber(prev => prev + 1)
        }
    }, [lastTick])

    return (
        <NumberPanel
            className={props.className}
            number={number}
            title="Number of executions"
        />
    )
}

export default DexExecutionPanelUpdater
