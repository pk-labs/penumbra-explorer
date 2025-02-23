import Link from 'next/link'
import { FC } from 'react'
import styles from './breadcrumb.module.css'

export interface Props {
    children: string
    href?: string
}

const Breadcrumb: FC<Props> = props =>
    props.href ? (
        <Link className={styles.root} href={props.href}>
            {props.children}
        </Link>
    ) : (
        <span className={styles.root}>{props.children}</span>
    )

export default Breadcrumb
