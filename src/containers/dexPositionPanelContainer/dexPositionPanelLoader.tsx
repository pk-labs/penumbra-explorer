// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { NumberPanel } from '@/components'
import { Props } from './dexPositionPanelContainer'

const DexPositionPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 10000, min: 10 })),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <NumberPanel
            className={props.className}
            number={number}
            title="Total open positions"
        />
    )
}

export default DexPositionPanelLoader
