import { FC } from 'react'
import { DexPositionState } from '@/lib/types'
import { Pill, PillProps } from '../pill'

interface Props {
    className?: string
    state?: DexPositionState
}

const DexPositionStatePill: FC<Props> = props => {
    let context: PillProps['context']

    switch (props.state) {
        case DexPositionState.Open:
            context = 'technical-success'
            break
        case DexPositionState.Executing:
            context = 'technical-caution'
            break
        case DexPositionState.Withdrawn:
            context = 'technical-destructive'
            break
        case DexPositionState.Closed:
            context = 'technical-default'
            break
        default:
            return null
    }

    return (
        <Pill
            className={props.className}
            context={context}
            priority="secondary"
        >
            {props.state}
        </Pill>
    )
}

export default DexPositionStatePill
