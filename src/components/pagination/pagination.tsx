'use client'

import clsx from 'clsx'
import { FC } from 'react'
import Button from '../button'
import styles from './pagination.module.css'

interface Props {
    className?: string
}

const Pagination: FC<Props> = props => (
    <div className={clsx(styles.root, props.className)}>
        <Button onClick={() => console.log('Prev')} disabled>
            Prev
        </Button>
        <Button onClick={() => console.log('Next')}>Next</Button>
    </div>
)

export default Pagination
