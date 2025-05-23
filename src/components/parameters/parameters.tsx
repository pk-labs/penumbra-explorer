import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

interface Props {
    children?: ReactNode
    className?: string
}

const Parameters: FC<Props> = props => (
    <ul
        className={classNames(
            'text-text-secondary flex flex-col gap-1 font-mono text-sm',
            'font-medium',
            props.className
        )}
    >
        {props.children}
    </ul>
)

export default Parameters
