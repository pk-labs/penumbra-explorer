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
            'flex flex-col gap-4 overflow-x-auto rounded-2xl bg-(--surface)',
            'p-6 backdrop-blur-[32px]',
            props.className
        )}
    >
        {Boolean(props.title || props.actions) && (
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium capitalize">
                    {props.title}
                </h2>
                <div className="text-(--textSecondary)">{props.actions}</div>
            </div>
        )}
        <table className="flex-1">{props.children}</table>
        {props.footer && (
            <div
                className={twMerge(
                    '-mt-2 border-t border-(--surfaceLighter) pt-4 text-xs',
                    'text-(--textSecondary)',
                    props.footerClassName
                )}
            >
                {props.footer}
            </div>
        )}
    </div>
)

export default Table
