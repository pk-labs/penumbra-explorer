// istanbul ignore file
'use client'

import { faker } from '@faker-js/faker'
import { FC, useEffect, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as DexExecutionPanelContainerProps } from './dexExecutionPanelContainer'

interface Props extends DexExecutionPanelContainerProps {
    number: number
}

const DexExecutionPanelUpdater: FC<Props> = props => {
    const [number, setNumber] = useState(props.number)

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const scheduleNextUpdate = () => {
            timeout = setTimeout(
                () => {
                    setNumber(prev => prev + 1)
                    scheduleNextUpdate()
                },
                faker.number.int({ max: 3000, min: 500 })
            )
        }

        scheduleNextUpdate()

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [])

    return (
        <NumberPanel
            className={props.className}
            number={number}
            title="Number of executions"
        />
    )
}

export default DexExecutionPanelUpdater
