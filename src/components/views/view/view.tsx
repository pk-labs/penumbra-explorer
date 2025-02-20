import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import styles from './view.module.css'

export interface Props {
    children?: ReactNode
    className?: string
    subtitle: string
    title: string
}

const View: FC<Props> = props => (
    <article className={clsx(styles.root, props.className)}>
        <header className={styles.header}>
            <h2 className={styles.title}>{props.title}</h2>
            <div className={styles.subtitle}>{props.subtitle}</div>
        </header>
        {props.children}
    </article>
)

export default View
