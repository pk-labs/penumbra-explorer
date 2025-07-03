import { FC } from 'react'
import { ProposalState } from '@/lib/types'
import { ucFirst } from '@/lib/utils'
import { Pill, PillProps } from '../pill'

interface Props {
    className?: string
    state?: ProposalState
}

const ProposalStatePill: FC<Props> = props => {
    let context: PillProps['context']

    switch (props.state) {
        case ProposalState.Claimed:
            context = 'technical-success'
            break
        case ProposalState.Voting:
            context = 'technical-caution'
            break
        case ProposalState.Withdrawn:
            context = 'technical-destructive'
            break
        case ProposalState.Finished:
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

export default ProposalStatePill
