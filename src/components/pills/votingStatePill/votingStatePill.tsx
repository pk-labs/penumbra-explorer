import { FC } from 'react'
import { VotingState } from '@/lib/types'
import { ucFirst } from '@/lib/utils'
import { Pill, PillProps } from '../pill'

interface Props {
    className?: string
    state?: VotingState
}

const VotingStatePill: FC<Props> = props => {
    let context: PillProps['context']

    switch (props.state) {
        case VotingState.Passed:
            context = 'success'
            break
        case VotingState.InProgress:
            context = 'caution'
            break
        case VotingState.Failed:
        case VotingState.Slashed:
            context = 'destructive'
            break
        default:
            return null
    }

    return (
        <Pill className={props.className} context={context}>
            {ucFirst(props.state)}
        </Pill>
    )
}

export default VotingStatePill
