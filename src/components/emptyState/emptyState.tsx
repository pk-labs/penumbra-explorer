import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    children?: ReactNode
    className?: string
    title: string
}

const EmptyState: FC<Props> = props => (
    <div
        className={twMerge(
            'flex flex-col items-center justify-center px-6 py-8',
            props.className
        )}
    >
        <div className="font-primary text-base font-normal">{props.title}</div>
        {props.children && (
            <div
                className={twMerge(
                    'font-primary text-sm font-normal text-(--textSecondary)'
                )}
            >
                {props.children}
            </div>
        )}
    </div>
)

export default EmptyState
