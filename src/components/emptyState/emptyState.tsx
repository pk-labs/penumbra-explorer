import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    className?: string
    title: string
}

const EmptyState: FC<Props> = props => (
    <div
        className={clsx(
            'flex flex-col items-center justify-center px-6 py-8',
            props.className
        )}
    >
        <div className="font-primary text-base font-normal">{props.title}</div>
        {props.children && (
            <div
                className={clsx(
                    'font-primary text-sm font-normal text-(--textSecondary)'
                )}
            >
                {props.children}
            </div>
        )}
    </div>
)

export default EmptyState
