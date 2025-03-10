'use client'

import { motion } from 'motion/react'
import { FC, ReactElement } from 'react'
import { fastOutSlowIn } from '@/lib/constants'
import { SearchResultProps } from '../searchResult'
import styles from './searchResultOverlay.module.css'

export interface Props {
    children?:
        | Array<
              | Array<ReactElement<SearchResultProps>>
              | false
              | null
              | ReactElement<SearchResultProps>
              | undefined
          >
        | ReactElement<SearchResultProps>
    title: string
}

const SearchResultOverlay: FC<Props> = props => (
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

export default SearchResultOverlay
