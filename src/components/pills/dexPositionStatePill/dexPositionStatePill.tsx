import { FC } from 'react'
import { LiquidityPositionState } from '@/lib/graphql/generated/types'
import { ucFirst } from '@/lib/utils'
import { Pill, PillProps } from '../pill'

interface Props {
    className?: string
    state?: LiquidityPositionState
}

const DexPositionStatePill: FC<Props> = props => {
    let context: PillProps['context']

    switch (props.state) {
        case LiquidityPositionState.Open:
            context = 'success'
            break
        case LiquidityPositionState.Executing:
            context = 'caution'
            break
        case LiquidityPositionState.Withdrawn:
            context = 'destructive'
            break
        case LiquidityPositionState.Closed:
            context = 'default'
            break
        default:
            return null
    }

    return (
        <Pill
            className={props.className}
            context={context}
            priority="secondary"
            technical
        >
            {ucFirst(props.state)}
        </Pill>
    )
}

export default DexPositionStatePill
