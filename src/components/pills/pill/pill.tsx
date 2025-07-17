import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

export interface Props {
    children?: ReactNode
    className?: string
    compact?: boolean
    context?: 'caution' | 'default' | 'destructive' | 'success'
    priority?: 'primary' | 'secondary'
    technical?: boolean
}

const Pill: FC<Props> = props => {
    const priority = props.priority ?? 'primary'
    const context = props.context ?? 'default'

    return (
        <span
            className={classNames(
                'inline-flex w-max max-w-full items-center gap-1 rounded-full',
                'border-none px-3 text-sm',
                props.compact ? 'py-1' : 'py-1.5',
                props.technical
                    ? 'font-mono font-medium'
                    : 'font-default font-normal',
                context === 'default' &&
                    (priority === 'primary'
                        ? 'text-text-primary bg-other-tonal-fill10'
                        : 'text-text-primary bg-transparent'),
                context === 'success' &&
                    (priority === 'primary'
                        ? 'text-secondary-dark bg-success-light'
                        : 'text-success-light bg-transparent'),
                context === 'caution' &&
                    (priority === 'primary'
                        ? 'text-secondary-dark bg-caution-light'
                        : 'text-caution-light bg-transparent'),
                context === 'destructive' &&
                    (priority === 'primary'
                        ? 'text-secondary-dark bg-destructive-light'
                        : 'text-destructive-light bg-transparent'),
                priority === 'secondary' &&
                    'border-other-tonal-stroke border-2 border-dashed',
                props.className
            )}
        >
            {props.children}
        </span>
    )
}

export default Pill
