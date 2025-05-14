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
import { SearchResult, SearchResultOverlay } from '@/components'
import {
    SearchQuery,
    SearchQueryVariables,
} from '@/lib/graphql/generated/types'
import { searchQuery } from '@/lib/graphql/queries'
import { useDebounce, useLocalStorage } from '@/lib/hooks'
import { searchIbc } from '@/lib/ibc'
import { StoredSearchResult } from '@/lib/types'
import { classNames } from '@/lib/utils'

interface Props {
    autoFocus?: boolean
    className?: string
    onBlur?: () => void
}

// TODO: Refactor to server component and wrap client logic in client component
// TODO: Refactor UM price container to server component to circumvent API CORS
const SearchContainer: FC<Props> = props => {
    const graphqlClient = useClient()
    const inputRef = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)
    const [inputQuery, setInputQuery] = useState('')
    const [searchResult, setSearchResult] = useState<StoredSearchResult>()
    const [queryExecuted, setQueryExecuted] = useState(false)

    const [executeSearchQuery, cancelSearchQuery] = useDebounce<
        (query: string) => Promise<StoredSearchResult | undefined>
    >(async (query: string) => {
        const client = searchIbc(query)

        if (client) {
            return {
                id: client.id,
                type: 'client',
            }
        }

        const result = await graphqlClient
            .query<
                SearchQuery,
                SearchQueryVariables
            >(searchQuery, { slug: query })
            .toPromise()

        if (result.error || !result.data?.search) {
            return
        } else if (result.data.search.__typename === 'Block') {
            return {
                height: result.data.search.height,
                type: 'block',
            }
        } else {
            return {
                hash: result.data.search.hash.toLowerCase(),
                type: 'transaction',
            }
        }
    }, 300)

    const [recentSearchResults, setRecentSearchResults] =
        useLocalStorage<Array<StoredSearchResult>>('search')

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
                        searchResult.type === 'block'
                            ? 'Block'
                            : searchResult.type === 'transaction'
                              ? 'Transaction'
                              : 'IBC chain'
                    }
                >
                    <ul
                        className={classNames(
                            'flex flex-col gap-2 font-mono text-sm',
                            'font-medium'
                        )}
                    >
                        <SearchResult searchResult={searchResult} />
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
                        <SearchResult key={i} searchResult={searchResult} />
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
                    'hover:stroke-text-primary ease-fast-out-slow-in duration-200'
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
                    'outline-transparent backdrop-blur-lg',
                    'focus:outline-text-secondary focus:transition-none'
                )}
                onBlur={onInputBlur}
                onChange={onInputChange}
                onFocus={onInputFocus}
                placeholder="Search by block height, transaction hash or chain name"
                type="text"
                value={inputQuery}
            />
            <AnimatePresence initial={false}>
                {focused && searchResults}
            </AnimatePresence>
        </div>
    )
}

export default SearchContainer
