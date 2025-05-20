import { FC, ReactElement, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

export interface Props {
    children?:
        | Array<ReactElement<HTMLTableSectionElement>>
        | false
        | null
        | ReactElement<HTMLTableSectionElement>
        | undefined
    className?: string
    footer?: ReactNode
    header?: ReactNode
}

const Table: FC<Props> = props => (
    <div
        className={classNames(
            'bg-other-tonalFill5 flex flex-col gap-4 rounded-lg p-6',
            'backdrop-blur-lg',
            props.className
        )}
    >
        {props.header}
        <div className="flex-1 overflow-x-auto">
            <table className="w-full">{props.children}</table>
        </div>
        {props.footer}
    </div>
)

export default Table
