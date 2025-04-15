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
import { useClient } from 'urql'
import {
    SearchQuery,
    SearchQueryVariables,
} from '@/lib/graphql/generated/types'
import { searchQuery } from '@/lib/graphql/queries'
import { useDebounce, useLocalStorage } from '@/lib/hooks'
import { classNames } from '@/lib/utils'
import { SearchResult } from './searchResult'
import { SearchResultOverlay } from './searchResultOverlay'

interface Props {
    autoFocus?: boolean
    className?: string
    onBlur?: () => void
}

// TODO: Extract logic/data part of this to container
// TODO: Refactor to server component and wrap client logic in client component
// TODO: Refactor UM price container to server component to circumvent API CORS
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

    // istanbul ignore next
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
                    <ul
                        className={classNames(
                            'flex flex-col gap-2 font-mono text-sm',
                            'font-medium'
                        )}
                    >
                        <SearchResult heightOrHash={searchResult} />
                    </ul>
                </SearchResultOverlay>
            )
        } else {
            searchResults = (
                <SearchResultOverlay>
                    <p className="font-default px-2 pt-1 text-sm font-normal">
                        <span className="text-text-primary">
                            We couldn’t find any matching results.
                        </span>
                        <br />
                        <span className="text-text-secondary">
                            Please check the transaction hash or block height
                            and try again.
                        </span>
                    </p>
                </SearchResultOverlay>
            )
        }
    } else if (recentSearchResults?.length) {
        searchResults = (
            <SearchResultOverlay title="Recent search results">
                <ul
                    className={classNames(
                        'flex flex-col gap-2 font-mono text-sm',
                        'font-medium'
                    )}
                >
                    {recentSearchResults.map((searchResult, i) => (
                        <SearchResult key={i} heightOrHash={searchResult} />
                    ))}
                </ul>
            </SearchResultOverlay>
        )
    }

    return (
        <div
            className={classNames(
                'relative w-full sm:w-[568px] xl:w-[639px]!',
                props.className
            )}
            onClick={onClick}
        >
            <SearchIcon
                className={classNames(
                    'transition-stroke absolute top-1/2 left-4 z-10',
                    'stroke-text-secondary -translate-y-1/2 cursor-pointer',
                    'hover:stroke-text-primary duration-200 ease-(--fastOutSlowIn)'
                )}
                onClick={focusInput}
                size={16}
            />
            <input
                ref={inputRef}
                autoFocus={props.autoFocus}
                className={classNames(
                    'font-default bg-other-tonalFill5 w-full rounded-sm p-4',
                    'text-text-secondary pl-11 text-base outline-2',
                    'outline-transparent backdrop-blur-[32px]',
                    'focus:outline-text-secondary focus:transition-none'
                )}
                onBlur={onInputBlur}
                onChange={onInputChange}
                onFocus={onInputFocus}
                placeholder="Search by block height or transaction hash"
                type="text"
                value={inputQuery}
            />
            <AnimatePresence initial={false}>
                {focused && searchResults}
            </AnimatePresence>
        </div>
    )
}

export default Search
