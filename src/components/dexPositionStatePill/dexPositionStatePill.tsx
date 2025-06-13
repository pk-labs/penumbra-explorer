import { FC } from 'react'
import { ucFirst } from '@/lib/utils'
import { Pill, PillProps } from '../pill'

interface Props {
    className?: string
    state?: 'closed' | 'executing' | 'open' | 'withdrawn'
}

const DexPositionStatePill: FC<Props> = props => {
    let context: PillProps['context']

    switch (props.state) {
        case 'open':
            context = 'technical-success'
            break
        case 'executing':
            context = 'technical-caution'
            break
        case 'withdrawn':
            context = 'technical-destructive'
            break
        case 'closed':
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
