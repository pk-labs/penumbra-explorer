'use client'

import clsx from 'clsx'
import { FC, MouseEvent } from 'react'
import Button from '../button'
import styles from './pagination.module.css'

interface Props {
    className?: string
    itemsPerPage: number
    onNext?: (e: MouseEvent) => void
    onPrev?: (e: MouseEvent) => void
    page: number
    totalItems?: number
}

const Pagination: FC<Props> = props => (
    <div className={clsx(styles.root, props.className)}>
        <Button className={styles.button} onClick={props.onPrev} disabled>
            Prev
        </Button>
        <span className={styles.pages}>
            {props.page}
            {props.totalItems &&
                ` of ${Math.floor(props.totalItems / props.itemsPerPage)}`}
        </span>
        <Button className={styles.button} onClick={props.onNext}>
            Next
        </Button>
    </div>
)

export default Pagination
