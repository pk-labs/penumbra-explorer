'use client'

import { motion } from 'motion/react'
import { FC, ReactNode } from 'react'
import { fastOutSlowIn } from '@/lib/constants'
import styles from './searchResults.module.css'

interface Props {
    children?: ReactNode
    title: string
}

const SearchResults: FC<Props> = props => (
    <motion.div
        animate={{ opacity: 1, transition: { duration: 0 } }}
        className={styles.root}
        exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: fastOutSlowIn },
        }}
        initial={{ opacity: 0 }}
    >
        <h3 className={styles.title}>{props.title}</h3>
        {props.children && <ul className={styles.list}>{props.children}</ul>}
    </motion.div>
)

export default SearchResults
