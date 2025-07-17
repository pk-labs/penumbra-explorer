import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

interface Props {
    children?: ReactNode
    className?: string
    title?: ReactNode
    titleClassName?: string
}

const Subsection: FC<Props> = props => (
    <div className={classNames('flex flex-col gap-2', props.className)}>
        {props.title && (
            <h3
                className={classNames(
                    'flex items-center gap-1 text-sm',
                    props.titleClassName
                )}
            >
                {props.title}
            </h3>
        )}
        {props.children}
    </div>
)

export default Subsection
