// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { BlockPanel, BlockTable } from '@/components'
import dayjs from '@/lib/dayjs'
import { useBlockUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { TransformedPartialBlockFragment } from '@/lib/types'
import { Props as LatestBlocksContainerProps } from './latestBlocksContainer'

interface Props extends LatestBlocksContainerProps {
    blocks?: TransformedPartialBlockFragment[]
}

const LatestBlocksUpdater: FC<Props> = props => {
    const [blocks, setBlocks] = useState(props.blocks)
    const [blockSubscription] = useBlockUpdateSubscription({
        variables: { limit: props.limit },
    })
    const blockUpdate = blockSubscription.data?.latestBlocks

    useEffect(() => {
        if (blockUpdate) {
            setBlocks(prev => {
                if (
                    !prev ||
                    prev.some(block => blockUpdate.height === block.height)
                ) {
                    return prev
                }

                const date = dayjs(blockUpdate.createdAt)

                return [
                    {
                        height: blockUpdate.height,
                        initialTimeAgo: dayjs().to(date),
                        timestamp: date.valueOf(),
                        transactionsCount: blockUpdate.transactionsCount,
                    },
                    ...prev.slice(0, -1),
                ]
            })
        }
    }, [blockUpdate])

    const latestBlockHeight = blocks?.length ? blocks[0].height : 0

    return (
        <>
            <BlockPanel
                className={props.blockPanelClassName}
                number={latestBlockHeight}
            />
            <BlockTable
                blocks={blocks}
                className={props.blockTableClassName}
                header={props.header}
                ticker={props.ticker}
            />
        </>
    )
}

export default LatestBlocksUpdater
