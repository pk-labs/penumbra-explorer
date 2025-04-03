import { FC, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

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
        className={twMerge(
            'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg p-6',
            'backdrop-blur-[32px]',
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
                className={twMerge(
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
