import {
    CheckCheckIcon,
    CircleHelpIcon,
    CircleXIcon,
    Clock4Icon,
    TimerOffIcon,
} from 'lucide-react'
import { FC } from 'react'
import { IbcStatus } from '@/lib/graphql/generated/types'
import { classNames } from '@/lib/utils'

interface Props {
    className?: string
    size?: number
    status?: IbcStatus
}

const TransactionStatusIcon: FC<Props> = props => {
    const status = props.status ?? IbcStatus.Unknown
    const size = props.size ?? 14

    switch (status) {
        case IbcStatus.Completed:
            return (
                <CheckCheckIcon
                    className={classNames(
                        'text-secondary-light inline',
                        props.className
                    )}
                    size={size}
                />
            )
        case IbcStatus.Pending:
            return (
                <Clock4Icon
                    className={classNames(
                        'text-caution-light inline',
                        props.className
                    )}
                    size={size}
                />
            )
        case IbcStatus.Expired:
            return (
                <TimerOffIcon
                    className={classNames(
                        'text-text-secondary inline',
                        props.className
                    )}
                    size={size}
                />
            )
        case IbcStatus.Error:
            return (
                <CircleXIcon
                    className={classNames(
                        'text-destructive-main inline',
                        props.className
                    )}
                    size={size}
                />
            )
        default:
            return (
                <CircleHelpIcon
                    className={classNames(
                        'text-text-secondary inline',
                        props.className
                    )}
                    size={size}
                />
            )
    }
}

export default TransactionStatusIcon
