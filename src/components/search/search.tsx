/* istanbul ignore file */
'use client'

import { useDebounce } from '@uidotdev/usehooks'
import clsx from 'clsx'
import { Box, CheckCheck, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import {
    ChangeEvent,
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useSearchQuery } from '@/lib/graphql/generated/hooks'
import { formatNumber } from '@/lib/utils'
import styles from './search.module.css'
import SearchResults from './searchResults'

interface Props {
    children?: ReactNode
    className?: string
    narrow?: boolean
}

const Search: FC<Props> = props => {
    const input = useRef<HTMLInputElement>(null)
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 300)

    const [searchQuery, executeSearchQuery] = useSearchQuery({
        pause: true,
        variables: { slug: query },
    })

    useEffect(() => {
        if (debouncedQuery) {
            executeSearchQuery()
        }
    }, [debouncedQuery, executeSearchQuery])

    const focusInput = useCallback(() => input.current?.focus(), [])

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value),
        []
    )

    let searchResults
    const search = searchQuery.data?.search

    if (query) {
        if (search) {
            searchResults = (
                <SearchResults
                    className={styles.results}
                    title={search.__typename}
                >
                    {search.__typename === 'Block' ? (
                        <li>
                            <Box color="var(--textSecondary)" size={16} />
                            <Link href={`/block/${search.height}`}>
                                {formatNumber(search.height)}
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <CheckCheck
                                color="var(--secondaryLight)"
                                size={16}
                            />
                            <Link href={`/tx/${search.hash}`}>
                                {search.hash.toLowerCase()}
                            </Link>
                        </li>
                    )}
                </SearchResults>
            )
        } else {
            searchResults = (
                <SearchResults
                    className={styles.results}
                    title="Nothing found"
                />
            )
        }
    } /*else {
        searchResults = (
            <SearchResults
                className={styles.results}
                title="Recent search results"
            >
                <li>
                    <Box color="var(--textSecondary)" size={16} />
                    <Link href="/block/1057456">1,057,456</Link>
                </li>
                <li>
                    <Box color="var(--textSecondary)" size={16} />
                    <Link href="/block/1057456">1,057,456</Link>
                </li>
                <li>
                    <Box color="var(--textSecondary)" size={16} />
                    <Link href="/block/1057456">1,057,456</Link>
                </li>
            </SearchResults>
        )
    }*/

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
                name="query"
                onChange={onInputChange}
                placeholder="Search by address, hash number, blocks, etc."
            />
            {searchResults}
        </div>
    )
}

export default Search
