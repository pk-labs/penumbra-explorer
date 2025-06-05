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
        const result = await graphqlClient
            .query<
                SearchQuery,
                SearchQueryVariables
            >(searchQuery, { slug: query })
            .toPromise()

        if (result.error || !result.data?.search) {
            const client = searchIbc(query)

            if (client) {
                return {
                    id: client.id,
                    type: 'client',
                }
            }
        } else if (result.data.search.__typename === 'Block') {
            return {
                height: result.data.search.height,
                type: 'block',
            }
        } else if (result.data.search.__typename === 'Transaction') {
            return {
                hash: result.data.search.hash.toLowerCase(),
                type: 'transaction',
            }
        } else if (result.data.search.__typename === 'ValidatorSearchResults') {
            return {
                id: result.data.search.items[0].id,
                name: result.data.search.items[0].displayName,
                type: 'validator',
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
                    ...recentSearchResults.filter(result => {
                        if (
                            result.type === 'block' &&
                            result.type === searchResult.type
                        ) {
                            return result.height !== searchResult.height
                        } else if (
                            result.type === 'transaction' &&
                            result.type === searchResult.type
                        ) {
                            return result.hash !== searchResult.hash
                        } else if (
                            result.type === 'client' &&
                            result.type === searchResult.type
                        ) {
                            return result.id !== searchResult.id
                        } else if (
                            result.type === 'validator' &&
                            result.type === searchResult.type
                        ) {
                            return result.id !== searchResult.id
                        }

                        return true
                    }),
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
            const titles = {
                block: 'Block',
                client: 'IBC chain',
                transaction: 'Transaction',
                validator: 'Validator',
            }

            searchResults = (
                <SearchResultOverlay title={titles[searchResult.type]}>
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
                    <p className="font-default px-2 py-1 text-sm font-normal">
                        We couldn’t find any results matching your search.
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
                placeholder="Search the blockchain"
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
