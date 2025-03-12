import clsx from 'clsx'
import { FC, ReactElement, ReactNode } from 'react'
import styles from './table.module.css'

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
    <div className={clsx(styles.root, props.className)}>
        {Boolean(props.title || props.actions) && (
            <div className={styles.header}>
                <h2 className={styles.title}>{props.title}</h2>
                <div className={styles.actions}>{props.actions}</div>
            </div>
        )}
        <table className={styles.table}>{props.children}</table>
        {props.footer && (
            <div className={clsx(styles.footer, props.footerClassName)}>
                {props.footer}
            </div>
        )}
    </div>
)

export default Table
