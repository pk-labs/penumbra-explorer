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
        if (lastTick.second() % 5 === 0) {
            setNumber(prev => prev + 1)
        }

        // let timeout: NodeJS.Timeout
        //
        // const scheduleNextUpdate = () => {
        //     timeout = setTimeout(
        //         () => {
        //             setNumber(prev => prev + 1)
        //             scheduleNextUpdate()
        //         },
        //         faker.number.int({ max: 5000, min: 2000 })
        //     )
        // }
        //
        // scheduleNextUpdate()
        //
        // return () => {
        //     if (timeout) {
        //         clearTimeout(timeout)
        //     }
        // }
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
