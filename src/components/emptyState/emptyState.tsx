import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import styles from './emptyState.module.css'

interface Props {
    children?: ReactNode
    className?: string
    title: string
}

const EmptyState: FC<Props> = props => (
    <div className={clsx(styles.root, props.className)}>
        <div className={styles.title}>{props.title}</div>
        {props.children && (
            <div className={styles.message}>{props.children}</div>
        )}
    </div>
)

export default EmptyState
