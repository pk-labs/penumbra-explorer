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
            context = 'technical-success'
            break
        case LiquidityPositionState.Executing:
            context = 'technical-caution'
            break
        case LiquidityPositionState.Withdrawn:
            context = 'technical-destructive'
            break
        case LiquidityPositionState.Closed:
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
            {ucFirst(props.state)}
        </Pill>
    )
}

export default DexPositionStatePill
