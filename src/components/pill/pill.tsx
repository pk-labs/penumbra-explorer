import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    children: ReactNode
    className?: string
}

const Pill: FC<Props> = props => (
    <span
        className={twMerge(
            'inline-flex h-8 max-w-47 items-center truncate rounded-full',
            'text-text-primary bg-(--surface) px-3 text-sm font-medium',
            props.className
        )}
    >
        {props.children}
    </span>
)

export default Pill
