'use client'

import clsx from 'clsx'
import { Search as SearchIcon } from 'lucide-react'
import { FC, ReactNode } from 'react'
import styles from './search.module.css'

interface Props {
    children?: ReactNode
    className?: string
    narrow?: boolean
}

const Search: FC<Props> = props => (
    <div className={clsx(styles.root, props.className)}>
        <SearchIcon size={16} />
        <span>Search by address, hash number, blocks, etc.</span>
    </div>
)

export default Search
