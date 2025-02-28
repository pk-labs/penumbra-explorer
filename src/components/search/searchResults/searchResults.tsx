'use client'

import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import styles from './searchResults.module.css'

interface Props {
    children?: ReactNode
    className?: string
    title: string
}

const SearchResults: FC<Props> = props => (
    <div className={clsx(styles.root, props.className)}>
        <h3 className={styles.title}>{props.title}</h3>
        {props.children && <ul className={styles.list}>{props.children}</ul>}
    </div>
)

export default SearchResults
