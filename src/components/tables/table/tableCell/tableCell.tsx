import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
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
            className={twMerge(styles.root, props.className)}
            colSpan={props.colSpan}
        >
            {props.children}
        </Element>
    )
}

export default TableCell
