// istanbul ignore file
import { FC } from 'react'
import { NumberPanel } from '@/components'
import getDexOpenPositions from '../../lib/data/getDexOpenPositions'
import { Props } from './dexPositionPanelContainer'

const DexPositionPanelLoader: FC<Props> = async props => {
    const number = await getDexOpenPositions()

    return (
        <NumberPanel
            className={props.className}
            number={number ?? 0}
            title="Total open positions"
        />
    )
}

export default DexPositionPanelLoader
