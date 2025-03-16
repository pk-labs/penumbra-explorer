'use client'

import { SearchIcon } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import {
    ChangeEvent,
    FC,
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { useClient } from 'urql'
import {
    SearchQuery,
    SearchQueryVariables,
} from '@/lib/graphql/generated/types'
import { searchQuery } from '@/lib/graphql/queries'
import { useDebounce, useLocalStorage } from '@/lib/hooks'
import { SearchResult } from './searchResult'
import { SearchResultOverlay } from './searchResultOverlay'

interface Props {
    autoFocus?: boolean
    className?: string
    onBlur?: () => void
}

const Search: FC<Props> = props => {
    const graphqlClient = useClient()
    const inputRef = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)
    const [inputQuery, setInputQuery] = useState('')
    const [searchResult, setSearchResult] = useState<number | string>()
    const [queryExecuted, setQueryExecuted] = useState(false)

    const [executeSearchQuery, cancelSearchQuery] = useDebounce<
        (query: string) => Promise<number | string | undefined>
    >(async (query: string) => {
        const result = await graphqlClient
            .query<
                SearchQuery,
                SearchQueryVariables
            >(searchQuery, { slug: query })
            .toPromise()

        if (result.error || !result.data?.search) {
            return
        }

        return result.data.search.__typename === 'Block'
            ? result.data.search.height
            : result.data.search.hash.toLowerCase()
    }, 300)

    const [recentSearchResults, setRecentSearchResults] =
        useLocalStorage<Array<number | string>>('search')

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

    const focusInput = useCallback(() => inputRef.current?.focus(), [])

    const onInputFocus = useCallback(() => setFocused(true), [])

    const onInputBlur = useCallback(() => {
        setFocused(false)
        props.onBlur?.call(undefined)
    }, [props.onBlur])

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            setInputQuery(value)

            const cleanedValue = value.trim().replaceAll(',', '')

            if (cleanedValue) {
                executeSearchQuery(cleanedValue).then(result => {
                    setSearchResult(result)
                    setQueryExecuted(true)
                })
            } else {
                cancelSearchQuery()
                setQueryExecuted(false)
                setSearchResult(undefined)
            }
        },
        [cancelSearchQuery, executeSearchQuery]
    )

    const onClick = useCallback((e: MouseEvent) => e.stopPropagation(), [])

    let searchResults

    if (inputQuery && queryExecuted) {
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
        <div
            className={twMerge(
                'relative w-[calc(100%-32px)] sm:w-[568px]',
                props.className
            )}
            onClick={onClick}
        >
            <SearchIcon
                className={twMerge(
                    'transition-stroke absolute top-1/2 left-4 z-10',
                    '-translate-y-1/2 cursor-pointer stroke-(--textSecondary)',
                    'duration-200 ease-(--fastOutSlowIn) hover:stroke-(--text)'
                )}
                onClick={focusInput}
                size={16}
            />
            <input
                ref={inputRef}
                autoFocus={props.autoFocus}
                className={twMerge(
                    'w-full rounded-lg bg-(--surface) p-4 pl-11',
                    'font-primary text-base text-(--textSecondary)',
                    'outline-2 outline-transparent backdrop-blur-[32px]',
                    'focus:outline-(--textSecondary) focus:transition-none'
                )}
                name="query"
                onBlur={onInputBlur}
                onChange={onInputChange}
                onFocus={onInputFocus}
                placeholder="Search by block height or transaction hash"
                value={inputQuery}
            />
            <AnimatePresence initial={false}>
                {focused && searchResults}
            </AnimatePresence>
        </div>
    )
}

export default Search
