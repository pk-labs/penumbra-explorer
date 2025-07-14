import { FC } from 'react'
import { ProposalOutcome } from '@/lib/graphql/generated/types'
import { ucFirst } from '@/lib/utils'
import { Pill, PillProps } from '../pill'

interface Props {
    className?: string
    outcome?: ProposalOutcome
}

const ProposalOutcomePill: FC<Props> = props => {
    let context: PillProps['context']

    switch (props.outcome) {
        case ProposalOutcome.Passed:
            context = 'success'
            break
        case ProposalOutcome.Failed:
        case ProposalOutcome.Slashed:
            context = 'destructive'
            break
        default:
            return null
    }

    return (
        <Pill className={props.className} context={context} technical>
            {ucFirst(props.outcome)}
        </Pill>
    )
}

export default ProposalOutcomePill
