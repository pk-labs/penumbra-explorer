// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { BlockTable } from '@/components'
import { heartbeat } from '@/lib/constants'
import dayjs from '@/lib/dayjs'
import { useBlocksQuery } from '@/lib/graphql/generated/hooks'
import { TransformedPartialBlockFragment } from '@/lib/types'
import { Props as LatestBlocksLoaderProps } from './latestBlocksLoader'

interface Props extends LatestBlocksLoaderProps {
    initialBlocks?: TransformedPartialBlockFragment[]
}

const LatestBlocksUpdater: FC<Props> = ({ limit, ...props }) => {
    const [blocks, setBlocks] = useState(props.initialBlocks)

    const [blocksQuery, executeBlocksQuery] = useBlocksQuery({
        pause: true,
        variables: {
            selector: { latest: { limit } },
        },
    })

    useEffect(() => {
        const timeout = setInterval(() => {
            executeBlocksQuery()
        }, heartbeat)

        return () => clearTimeout(timeout)
    }, [executeBlocksQuery])

    useEffect(() => {
        if (blocksQuery.data) {
            const now = dayjs()

            setBlocks(
                // TODO: Extract to utils
                blocksQuery.data.blocks
                    .map(block => ({
                        ...block,
                        timeAgo: block.createdAt
                            ? now.to(block.createdAt)
                            : undefined,
                    }))
                    .toSorted((a, b) => b.height - a.height)
            )
        }
    }, [blocksQuery.data])

    return <BlockTable blocks={blocks} {...props} />
}

export default LatestBlocksUpdater
