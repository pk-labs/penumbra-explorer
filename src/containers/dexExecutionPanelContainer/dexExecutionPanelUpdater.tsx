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

        const incrementNumber = () => {
            setNumber(prev => prev + 1)
            timeout = setTimeout(
                incrementNumber,
                faker.number.int({ max: 4000, min: 2000 })
            )
        }

        timeout = setTimeout(
            incrementNumber,
            faker.number.int({ max: 4000, min: 2000 })
        )

        return () => clearTimeout(timeout)
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
