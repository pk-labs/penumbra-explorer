import { FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'
import styles from './tableCell.module.css'

export interface Props {
    children?: ReactNode
    className?: string
    colSpan?: number
    header?: boolean
}

const TableCell: FC<Props> = props => {
    const Element = props.header ? 'th' : 'td'

    return (
        <Element
            className={classNames(
                styles.root,
                'h-12 px-3 text-left text-sm font-medium whitespace-nowrap',
                props.header
                    ? 'border-other-tonalFill10 text-text-secondary border-b ' +
                          'align-middle'
                    : 'font-mono',
                props.className
            )}
            colSpan={props.colSpan}
        >
            {props.children}
        </Element>
    )
}

export default TableCell
