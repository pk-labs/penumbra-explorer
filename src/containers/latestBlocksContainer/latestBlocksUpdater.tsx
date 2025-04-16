// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { BlockPanel, BlockTable } from '@/components'
import { pollingInterval } from '@/lib/constants'
import dayjs from '@/lib/dayjs'
import { useBlocksQuery } from '@/lib/graphql/generated/hooks'
import { TransformedPartialBlockFragment } from '@/lib/types'
import { Props as LatestBlocksLoaderProps } from './latestBlocksLoader'

interface Props extends LatestBlocksLoaderProps {
    initialBlocks?: TransformedPartialBlockFragment[]
}

const LatestBlocksUpdater: FC<Props> = props => {
    const [blocks, setBlocks] = useState(props.initialBlocks)

    const [blocksQuery, executeBlocksQuery] = useBlocksQuery({
        pause: true,
        variables: {
            selector: { latest: { limit: props.limit } },
        },
    })

    useEffect(() => {
        const interval = setInterval(() => {
            executeBlocksQuery()
        }, pollingInterval)

        return () => clearInterval(interval)
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

    const latestBlockHeight = blocks?.length ? blocks[0].height : undefined

    return (
        <>
            <BlockPanel
                className={props.blockPanelClassName}
                number={latestBlockHeight}
            />
            <BlockTable
                actions={props.actions}
                blocks={blocks}
                className={props.blockTableClassName}
                title={props.title}
            />
        </>
    )
}

export default LatestBlocksUpdater
