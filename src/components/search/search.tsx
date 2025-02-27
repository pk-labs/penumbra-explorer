'use client'

import clsx from 'clsx'
import { Search as SearchIcon } from 'lucide-react'
import { FC, ReactNode, useCallback, useRef } from 'react'
import styles from './search.module.css'

interface Props {
    children?: ReactNode
    className?: string
    narrow?: boolean
}

const Search: FC<Props> = props => {
    const input = useRef<HTMLInputElement>(null)

    const focusInput = useCallback(() => input.current?.focus(), [])

    return (
        <div className={clsx(styles.root, props.className)}>
            <SearchIcon
                className={styles.icon}
                onClick={focusInput}
                size={16}
            />
            <input
                ref={input}
                className={styles.input}
                placeholder="Search by address, hash number, blocks, etc."
            />
        </div>
    )
}

export default Search
