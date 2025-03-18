import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    children?: ReactNode
    className?: string
    title?: ReactNode
}

const Subsection: FC<Props> = props => (
    <div className={twMerge('flex flex-col gap-1', props.className)}>
        {props.title && (
            <h3 className="flex items-center gap-1 text-xs">{props.title}</h3>
        )}
        {props.children}
    </div>
)

export default Subsection
