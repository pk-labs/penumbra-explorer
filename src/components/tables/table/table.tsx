import { FC, ReactElement, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

export interface Props {
    actions?: ReactNode
    children?:
        | Array<ReactElement<HTMLTableSectionElement>>
        | false
        | null
        | ReactElement<HTMLTableSectionElement>
        | undefined
    className?: string
    footer?: ReactNode
    footerClassName?: string
    title?: string
}

const Table: FC<Props> = props => (
    <div
        className={classNames(
            'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg p-6',
            'backdrop-blur-lg',
            props.className
        )}
    >
        {Boolean(props.title || props.actions) && (
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium capitalize">
                    {props.title}
                </h2>
                <div className="text-text-secondary">{props.actions}</div>
            </div>
        )}
        <div className="flex-1 overflow-x-auto">
            <table className="w-full">{props.children}</table>
        </div>
        {props.footer && (
            <div
                className={classNames(
                    'text-text-secondary text-xs',
                    props.footerClassName
                )}
            >
                {props.footer}
            </div>
        )}
    </div>
)

export default Table
