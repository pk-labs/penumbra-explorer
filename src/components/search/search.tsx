/* istanbul ignore file */
'use client'

import clsx from 'clsx'
import { Search as SearchIcon } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useDebounceValue, useLocalStorage } from 'usehooks-ts'
import { useSearchQuery } from '@/lib/graphql/generated/hooks'
import styles from './search.module.css'
import { SearchResult } from './searchResult'
import SearchResultOverlay from './searchResultOverlay'

interface Props {
    autoFocus?: boolean
    className?: string
}

const Search: FC<Props> = props => {
    const input = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)
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
                : searchResult.hash.toLowerCase()

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

    const onInputFocus = useCallback(() => setFocused(true), [])

    const onInputBlur = useCallback(() => setFocused(false), [])

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
                <SearchResultOverlay title={searchResult.__typename}>
                    <SearchResult
                        heightOrHash={
                            searchResult.__typename === 'Block'
                                ? searchResult.height
                                : searchResult.hash.toLowerCase()
                        }
                    />
                </SearchResultOverlay>
            )
        } else {
            searchResults = <SearchResultOverlay title="Nothing found" />
        }
    } else if (recentSearchResults?.length) {
        searchResults = (
            <SearchResultOverlay title="Recent search results">
                {recentSearchResults.map((searchResult, i) => (
                    <SearchResult key={i} heightOrHash={searchResult} />
                ))}
            </SearchResultOverlay>
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
                autoFocus={props.autoFocus}
                className={styles.input}
                name="query"
                onBlur={onInputBlur}
                onChange={onInputChange}
                onFocus={onInputFocus}
                placeholder="Search by address, hash number, blocks, etc."
            />
            {
                <AnimatePresence initial={false}>
                    {focused && searchResults}
                </AnimatePresence>
            }
        </div>
    )
}

export default Search
