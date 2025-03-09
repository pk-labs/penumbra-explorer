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
import { useClient } from 'urql'
import { useDebounceCallback, useLocalStorage } from 'usehooks-ts'
import {
    SearchQuery,
    SearchQueryVariables,
} from '@/lib/graphql/generated/types'
import { searchQuery } from '@/lib/graphql/queries'
import styles from './search.module.css'
import { SearchResult } from './searchResult'
import SearchResultOverlay from './searchResultOverlay'

interface Props {
    autoFocus?: boolean
    className?: string
}

const Search: FC<Props> = props => {
    const graphqlClient = useClient()
    const input = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)
    const [inputQuery, setInputQuery] = useState('')
    const [searchResult, setSearchResult] = useState<number | string>()

    const executeSearchQuery = useCallback(
        async (query: string) => {
            const result = await graphqlClient
                .query<
                    SearchQuery,
                    SearchQueryVariables
                >(searchQuery, { slug: query })
                .toPromise()

            if (result.error) {
                setSearchResult(undefined)
            }

            return result.data?.search?.__typename === 'Block'
                ? result.data.search.height
                : result.data?.search?.hash.toLowerCase()
        },
        [graphqlClient]
    )

    const executeDebouncedSearchQuery = useDebounceCallback(
        executeSearchQuery,
        300
    )

    const [recentSearchResults, setRecentSearchResults] = useLocalStorage<
        Array<number | string>
    >('search', [], { initializeWithValue: false })

    useEffect(() => {
        if (!searchResult) {
            return
        }

        if (recentSearchResults?.length) {
            if (recentSearchResults[0] === searchResult) {
                return
            }

            setRecentSearchResults(
                [
                    searchResult,
                    ...recentSearchResults.filter(
                        result => result !== searchResult
                    ),
                ].slice(0, 5)
            )
        } else {
            setRecentSearchResults([searchResult])
        }
    }, [recentSearchResults, searchResult, setRecentSearchResults])

    const focusInput = useCallback(() => input.current?.focus(), [])

    const onInputFocus = useCallback(() => setFocused(true), [])

    const onInputBlur = useCallback(() => setFocused(false), [])

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            setInputQuery(value)

            if (value) {
                // executeSearchQuery(value).then(setSearchResult)
                executeDebouncedSearchQuery(value)?.then(setSearchResult)
            } else {
                setSearchResult(undefined)
            }
        },
        [executeDebouncedSearchQuery]
    )

    let searchResults

    if (inputQuery) {
        if (searchResult) {
            searchResults = (
                <SearchResultOverlay
                    title={
                        typeof searchResult === 'number'
                            ? 'Block'
                            : 'Transaction'
                    }
                >
                    <SearchResult heightOrHash={searchResult} />
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
                placeholder="Search by block height or transaction hash"
            />
            <AnimatePresence initial={false}>
                {focused && searchResults}
            </AnimatePresence>
        </div>
    )
}

export default Search
