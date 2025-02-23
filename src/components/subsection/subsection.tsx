import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import styles from './subsection.module.css'

interface Props {
    children?: ReactNode
    className?: string
    title?: string
}

const Subsection: FC<Props> = props => (
    <div className={clsx(styles.root, props.className)}>
        {props.title && <h3 className={styles.title}>{props.title}</h3>}
        {props.children}
    </div>
)

export default Subsection
