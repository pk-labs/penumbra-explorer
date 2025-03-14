import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string
}

const Pill: FC<Props> = props => (
    <span
        className={clsx(
            'inline-flex h-8 max-w-47 items-center truncate rounded-full',
            'bg-(--surface) px-3 text-sm font-medium text-(--text)',
            props.className
        )}
    >
        {props.children}
    </span>
)

export default Pill
