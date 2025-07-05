import { FC } from 'react'
import { IbcStatus } from '@/lib/graphql/generated/types'
import { ucFirst } from '@/lib/utils'
import { Pill } from '../pill'

interface Props {
    className?: string
    status?: IbcStatus
}

const TransactionStatusPill: FC<Props> = props => {
    return (
        <Pill
            className={props.className}
            context="technical-success"
            priority="secondary"
        >
            {ucFirst(IbcStatus.Completed)}
        </Pill>
    )

    // const status = props.status ?? IbcStatus.Unknown
    // let context: PillProps['context']
    //
    // switch (status) {
    //     case IbcStatus.Completed:
    //         context = 'technical-success'
    //         break
    //     case IbcStatus.Pending:
    //         context = 'technical-caution'
    //         break
    //     case IbcStatus.Error:
    //         context = 'technical-destructive'
    //         break
    //     default:
    //         context = 'technical-default'
    //         break
    // }
    //
    // return (
    //     <Pill
    //         className={props.className}
    //         context={context}
    //         priority="secondary"
    //     >
    //         {ucFirst(status)}
    //     </Pill>
    // )
}

export default TransactionStatusPill
