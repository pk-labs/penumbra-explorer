// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { BlockPanel, BlockTable } from '@/components'
import dayjs from '@/lib/dayjs'
import { useBlockUpdateSubscription } from '@/lib/graphql/generated/hooks'
import {
    TransformedBlockUpdate,
    TransformedPartialBlockFragment,
} from '@/lib/types'
import { Props as LatestBlocksLoaderProps } from './latestBlocksLoader'

interface Props extends LatestBlocksLoaderProps {
    initialBlocks?: Array<
        TransformedBlockUpdate | TransformedPartialBlockFragment
    >
}

const LatestBlocksUpdater: FC<Props> = props => {
    const [blocks, setBlocks] = useState(props.initialBlocks)

    const [blockUpdateSubscription] = useBlockUpdateSubscription({
        variables: { limit: props.limit },
    })

    useEffect(() => {
        if (blockUpdateSubscription.data?.latestBlocks) {
            const blockUpdate = blockUpdateSubscription.data.latestBlocks

            setBlocks(prev => {
                if (
                    !prev ||
                    prev.some(block => blockUpdate.height === block.height)
                ) {
                    return prev
                }

                const now = dayjs()

                return [
                    {
                        ...blockUpdate,
                        timeAgo: blockUpdate.createdAt
                            ? now.to(blockUpdate.createdAt)
                            : undefined,
                    },
                    ...prev.slice(0, -1).map(block => ({
                        ...block,
                        timeAgo: block.createdAt
                            ? now.to(block.createdAt)
                            : undefined,
                    })),
                ]
            })
        }
    }, [blockUpdateSubscription.data?.latestBlocks])

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
