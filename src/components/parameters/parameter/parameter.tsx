import { FC, ReactNode } from 'react'
import styles from './parameter.module.css'

export interface Props {
    children?: ReactNode
    name: string
}

const Parameter: FC<Props> = props => (
    <li className={styles.root}>
        <span className={styles.name}>{props.name}</span>
        <span className={styles.separator} />
        {props.children}
    </li>
)

export default Parameter
