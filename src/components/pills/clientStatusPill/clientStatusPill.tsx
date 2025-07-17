import { FC } from 'react'
import { ClientStatus } from '@/lib/graphql/generated/types'
import { ucFirst } from '@/lib/utils'
import { Pill, PillProps } from '../pill'

interface Props {
    className?: string
    status?: ClientStatus
}

const ClientStatusPill: FC<Props> = props => {
    const status = props.status ?? ClientStatus.Unknown
    let context: PillProps['context']

    switch (status) {
        case ClientStatus.Active:
            context = 'success'
            break
        case ClientStatus.Frozen:
            context = 'caution'
            break
        case ClientStatus.Expired:
            context = 'destructive'
            break
    }

    return (
        <Pill
            className={props.className}
            context={context}
            priority="secondary"
            technical
        >
            {ucFirst(status)}
        </Pill>
    )
}

export default ClientStatusPill
