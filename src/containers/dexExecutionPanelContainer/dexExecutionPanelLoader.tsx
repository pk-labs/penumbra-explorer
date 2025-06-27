// istanbul ignore file
import { FC } from 'react'
import { NumberPanel } from '@/components'
import { getDexTotalExecutions } from '@/lib/data'
import { Props } from './dexExecutionPanelContainer'

const DexExecutionPanelLoader: FC<Props> = async props => {
    const number = await getDexTotalExecutions()

    return (
        <NumberPanel
            className={props.className}
            number={number ?? 0}
            title="Number of executions"
        />
    )
}

export default DexExecutionPanelLoader
