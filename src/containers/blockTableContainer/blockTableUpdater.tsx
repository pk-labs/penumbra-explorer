// istanbul ignore file
'use client'

import { FC, useEffect, useMemo, useRef, useState } from 'react'
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
    const queueRef = useRef<TransformedPartialBlockFragment[]>([])
    const animationFrameRef = useRef<number>(undefined)
    const [blocks, setBlocks] = useState(props.blocks ?? [])

    const initialBlockHeights = useMemo(
        () => new Set(props.blocks?.map(block => block.height)),
        [props.blocks]
    )

    useEffect(() => {
        if (!subscription) {
            return
        }

        const source = client.subscription<
            BlockUpdateSubscription,
            BlockUpdateSubscriptionVariables
        >(blockSubscription, {})

        const { unsubscribe } = pipe(
            source,
            subscribe(result => {
                const block = result.data?.latestBlocks

                if (block && !initialBlockHeights.has(block.height)) {
                    queueRef.current.push({
                        height: block.height,
                        timestamp: dayjs(block.createdAt).valueOf(),
                        transactionsCount: block.transactionsCount,
                    })
                }
            })
        )

        return () => unsubscribe()
    }, [client, initialBlockHeights, subscription])

    useEffect(() => {
        const animationLoop = () => {
            if (queueRef.current.length > 0) {
                const block = queueRef.current.shift()

                if (block) {
                    setBlocks(prev => [block, ...prev].slice(0, 10))
                }
            }

            animationFrameRef.current = requestAnimationFrame(animationLoop)
        }

        animationFrameRef.current = requestAnimationFrame(animationLoop)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

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
