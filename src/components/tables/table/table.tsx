import { FC, ReactElement, ReactNode } from 'react'
import { classNames } from '@/lib/utils'
import Surface from '../../surface'

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
    <Surface className={classNames('flex flex-col gap-4 p-6', props.className)}>
        {props.header}
        <div className="scroll-area-component flex-1 overflow-x-auto">
            <table className="w-max min-w-full">{props.children}</table>
        </div>
        {props.footer}
    </Surface>
)

export default Table
