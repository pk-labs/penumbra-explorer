import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

interface Props {
    children?: ReactNode
    className?: string
    title?: string
}

const EmptyState: FC<Props> = props => (
    <div
        className={classNames(
            'flex flex-col items-center justify-center px-6 py-8',
            props.className
        )}
    >
        {props.title && (
            <div className="font-default text-base font-normal">
                {props.title}
            </div>
        )}
        {props.children && (
            <div
                className={classNames(
                    'font-default text-text-secondary text-sm font-normal'
                )}
            >
                {props.children}
            </div>
        )}
    </div>
)

export default EmptyState
