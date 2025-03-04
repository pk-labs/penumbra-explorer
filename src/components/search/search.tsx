/* istanbul ignore file */
'use client'

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
} from 'react'
import { useDebounceValue, useLocalStorage } from 'usehooks-ts'
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
    const [query, setQuery] = useDebounceValue('', 300)

    const [searchQuery, executeSearchQuery] = useSearchQuery({
        pause: true,
        variables: { slug: query },
    })

    const searchResult = searchQuery.data?.search

    const [recentSearchResults, setRecentSearchResults] = useLocalStorage<
        Array<number | string>
    >('search', [], { initializeWithValue: false })

    useEffect(() => {
        if (query) {
            executeSearchQuery()
        }
    }, [executeSearchQuery, query])

    useEffect(() => {
        if (!searchResult) {
            return
        }

        const recentSearchResult =
            searchResult.__typename === 'Block'
                ? searchResult.height
                : searchResult.hash

        if (recentSearchResults?.includes(recentSearchResult)) {
            return
        }

        if (Array.isArray(recentSearchResults)) {
            setRecentSearchResults(
                [recentSearchResult, ...recentSearchResults].slice(0, 5)
            )
        } else {
            setRecentSearchResults([recentSearchResult])
        }
    }, [recentSearchResults, searchResult, setRecentSearchResults])

    const focusInput = useCallback(() => input.current?.focus(), [])

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            const cleanedValue = value.trim().replaceAll(',', '')

            setQuery(cleanedValue)
        },
        [setQuery]
    )

    let searchResults

    if (query) {
        if (searchResult) {
            searchResults = (
                <SearchResults
                    className={styles.results}
                    title={searchResult.__typename}
                >
                    {searchResult.__typename === 'Block' ? (
                        <li>
                            <Box color="var(--textSecondary)" size={16} />
                            <Link href={`/block/${searchResult.height}`}>
                                {formatNumber(searchResult.height)}
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <CheckCheck
                                color="var(--secondaryLight)"
                                size={16}
                            />
                            <Link href={`/tx/${searchResult.hash}`}>
                                {searchResult.hash.toLowerCase()}
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
    } else if (recentSearchResults?.length) {
        searchResults = (
            <SearchResults
                className={styles.results}
                title="Recent search results"
            >
                {recentSearchResults.map((searchResult, i) =>
                    typeof searchResult === 'number' ? (
                        <li key={i}>
                            <Box color="var(--textSecondary)" size={16} />
                            <Link href={`/block/${searchResult}`}>
                                {formatNumber(searchResult)}
                            </Link>
                        </li>
                    ) : (
                        <li key={i}>
                            <CheckCheck
                                color="var(--secondaryLight)"
                                size={16}
                            />
                            <Link href={`/tx/${searchResult}`}>
                                {searchResult.toLowerCase()}
                            </Link>
                        </li>
                    )
                )}
            </SearchResults>
        )
    }

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
