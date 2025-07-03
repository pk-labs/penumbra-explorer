import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'
import Surface from '../../surface'

export interface Props {
    children?: ReactNode
    className?: string
    header?: ReactNode
    headerClassName?: string
    title: ReactNode
    titleClassName?: string
}

const Panel: FC<Props> = props => (
    <Surface
        as="section"
        className={classNames(
            'flex flex-col justify-between gap-4 p-6 sm:flex-row',
            props.className
        )}
    >
        <header className={classNames('flex flex-col', props.headerClassName)}>
            <h3
                className={classNames(
                    'text-text-secondary flex items-center gap-2 text-xs',
                    'whitespace-nowrap',
                    props.titleClassName
                )}
            >
                {props.title}
            </h3>
            {props.header}
        </header>
        {props.children && <div className="sm:self-end">{props.children}</div>}
    </Surface>
)

export default Panel
