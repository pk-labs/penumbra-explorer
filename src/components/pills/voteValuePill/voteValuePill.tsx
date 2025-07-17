import { FC } from 'react'
import { VoteValue } from '@/lib/graphql/generated/types'
import { ucFirst } from '@/lib/utils'
import { Pill, PillProps } from '../pill'

interface Props {
    className?: string
    value?: VoteValue
}

const VoteValuePill: FC<Props> = props => {
    let context: PillProps['context']

    switch (props.value) {
        case VoteValue.Yes:
            context = 'success'
            break
        case VoteValue.No:
            context = 'caution'
            break
        case VoteValue.Abstain:
            context = 'default'
            break
        default:
            return null
    }

    return (
        <Pill className={props.className} context={context} technical>
            {ucFirst(props.value)}
        </Pill>
    )
}

export default VoteValuePill
