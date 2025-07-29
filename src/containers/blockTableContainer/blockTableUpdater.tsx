// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe, throttle } from 'wonka'
import { BlockTable, Pagination } from '@/components'
import dayjs from '@/lib/dayjs'
import {
    BlockUpdateSubscription,
    BlockUpdateSubscriptionVariables,
} from '@/lib/graphql/generated/types'
import blockSubscription from '@/lib/graphql/subscriptions/blockSubscription.graphql'
import { TransformedPartialBlockFragment } from '@/lib/types'
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
        >(blockSubscription, { limit: limit.length })

        const sub = pipe(
            source,
            throttle(() => 1000),
            subscribe(result => {
                const blockUpdate = result.data?.latestBlocks

                if (blockUpdate) {
                    setBlocks(prev => {
                        if (
                            !prev ||
                            prev.some(
                                block => blockUpdate.height === block.height
                            )
                        ) {
                            return prev
                        }

                        return [
                            {
                                height: blockUpdate.height,
                                timestamp: dayjs(
                                    blockUpdate.createdAt
                                ).valueOf(),
                                transactionsCount:
                                    blockUpdate.transactionsCount,
                            },
                            ...prev.slice(0, -1),
                        ]
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
