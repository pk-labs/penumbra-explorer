// istanbul ignore file
'use client'

import { faker } from '@faker-js/faker'
import { FC, useEffect, useState } from 'react'
import { NumberPanel } from '@/components'
import { Props as DexPositionPanelContainerProps } from './dexPositionPanelContainer'

interface Props extends DexPositionPanelContainerProps {
    number: number
}

const DexPositionPanelUpdater: FC<Props> = props => {
    const [number, setNumber] = useState(props.number)

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const incrementNumber = () => {
            setNumber(prev => prev + 1)
            timeout = setTimeout(
                incrementNumber,
                faker.number.int({ max: 8000, min: 4000 })
            )
        }

        timeout = setTimeout(
            incrementNumber,
            faker.number.int({ max: 8000, min: 4000 })
        )

        return () => clearTimeout(timeout)
    }, [])

    return (
        <NumberPanel
            className={props.className}
            number={number}
            title="Total open positions"
        />
    )
}

export default DexPositionPanelUpdater
