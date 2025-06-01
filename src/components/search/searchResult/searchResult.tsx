'use client'

import { BoxIcon, CheckCheckIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import ibc from '@/lib/ibc'
import { penumbraImage } from '@/lib/images'
import { StoredSearchResult } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import Avatar from '../../avatar'

export interface Props {
    searchResult: StoredSearchResult
}

const SearchResult: FC<Props> = props => {
    const linkClassName = 'text-text-primary! flex gap-1 px-2 py-1 break-all'
    const iconClassName = '-mt-0.5 min-w-6 p-1'
    let link

    switch (props.searchResult.type) {
        case 'block':
            link = (
                <Link
                    className={linkClassName}
                    href={`/block/${props.searchResult.height}`}
                >
                    <BoxIcon className={iconClassName} />
                    {formatNumber(props.searchResult.height)}
                </Link>
            )
            break
        case 'transaction':
            link = (
                <Link
                    className={linkClassName}
                    href={`/tx/${props.searchResult.hash}`}
                >
                    <CheckCheckIcon className={iconClassName} />
                    {props.searchResult.hash}
                </Link>
            )
            break
        case 'client':
            const client = ibc.find(
                c =>
                    props.searchResult.type === 'client' &&
                    c?.id === props.searchResult.id
            )

            if (!client) {
                break
            }

            link = (
                <Link className={linkClassName} href={`/ibc/${client.slug}`}>
                    <Avatar
                        alt={client.name}
                        className="-mt-0.5 h-6 w-6 p-1"
                        fallback={penumbraImage}
                        src={client.image}
                    />
                    {client.name}
                </Link>
            )
            break
    }

    if (!link) {
        return
    }

    return (
        <li
            className={classNames(
                'transition-background rounded-sm duration-200',
                'hover:bg-action-hoverOverlay ease-fast-out-slow-in'
            )}
        >
            {link}
        </li>
    )
}

export default SearchResult
