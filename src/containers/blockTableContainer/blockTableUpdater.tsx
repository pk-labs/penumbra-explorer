// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe } from 'wonka'
import { BlockTable, Pagination } from '@/components'
import dayjs from '@/lib/dayjs'
import {
    BlockUpdateSubscription,
    BlockUpdateSubscriptionVariables,
} from '@/lib/graphql/generated/types'
import blockSubscription from '@/lib/graphql/subscriptions/blockSubscription.graphql'
import { TransformedPartialBlockFragment } from '@/lib/types'
import { throttleStream } from '@/lib/utils'
import { Props as BlockTableContainerProps } from './blockTableContainer'

interface Props extends BlockTableContainerProps {
    blocks?: TransformedPartialBlockFragment[]
    total: number
}

const BlockTableUpdater: FC<Props> = ({
    filter,
    limit,
    pagination,
    subscription,
    total,
    ...props
}) => {
    const client = useClient()
    const [blocks, setBlocks] = useState(props.blocks)

    useEffect(() => {
        if (!subscription) {
            return
        }

        const source = client.subscription<
            BlockUpdateSubscription,
            BlockUpdateSubscriptionVariables
        >(blockSubscription, {})

        const sub = pipe(
            throttleStream(source, 1000, 10),
            subscribe(results => {
                const latestBlocks: TransformedPartialBlockFragment[] = []

                for (const result of results) {
                    const block = result.data?.latestBlocks

                    if (block) {
                        latestBlocks.unshift({
                            height: block.height,
                            timestamp: dayjs(block.createdAt).valueOf(),
                            transactionsCount: block.transactionsCount,
                        })
                    }
                }

                if (latestBlocks.length) {
                    setBlocks(prev => {
                        const latestBlockHeights = new Set(
                            latestBlocks.map(block => block.height)
                        )

                        prev?.forEach(prevBlock => {
                            if (!latestBlockHeights.has(prevBlock.height)) {
                                latestBlocks.push(prevBlock)
                            }
                        })

                        return latestBlocks.slice(0, 10)
                    })
                }
            })
        )

        return () => sub.unsubscribe()
    }, [client, limit.length, subscription])

    return (
        <BlockTable
            {...props}
            blocks={blocks}
            footer={
                pagination ? (
                    <Pagination
                        page={(limit.offset ?? 0) / limit.length + 1}
                        totalPages={Math.ceil(total / limit.length)}
                    />
                ) : undefined
            }
        />
    )
}

export default BlockTableUpdater
