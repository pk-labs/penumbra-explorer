// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { NumberPanel } from '@/components'
import { Props } from './dexExecutionPanelContainer'

const DexExecutionPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 100000, min: 1000 })),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <NumberPanel
            className={props.className}
            number={number}
            title="Number of executions"
        />
    )
}

export default DexExecutionPanelLoader
