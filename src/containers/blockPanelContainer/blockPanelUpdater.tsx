// istanbul ignore file
'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe } from 'wonka'
import { BlockPanel } from '@/components'
import { animationFrameMs } from '@/lib/constants'
import {
    BlockUpdateSubscription,
    BlockUpdateSubscriptionVariables,
} from '@/lib/graphql/generated/types'
import blockSubscription from '@/lib/graphql/subscriptions/blockSubscription.graphql'
import { Props as BlockPanelContainerProps } from './blockPanelContainer'

interface Props extends BlockPanelContainerProps {
    blockHeight?: number
}

const BlockPanelUpdater: FC<Props> = props => {
    const client = useClient()
    const queueRef = useRef<number[]>([])
    const animationFrameRef = useRef<number>(undefined)
    const updateTimestampRef = useRef(0)
    const [reindexing, setReindexing] = useState(false)
    const [blockHeight, setBlockHeight] = useState(props.blockHeight)

    useEffect(() => {
        const source = client.subscription<
            BlockUpdateSubscription,
            BlockUpdateSubscriptionVariables
        >(blockSubscription, {})

        const { unsubscribe } = pipe(
            source,
            subscribe(result => {
                const block = result.data?.latestBlocks

                if (block) {
                    queueRef.current.push(block.height)
                    setReindexing(queueRef.current.length > 2)
                }
            })
        )

        return () => unsubscribe()
    }, [client])

    useEffect(() => {
        const animationLoop = () => {
            if (queueRef.current.length > 0) {
                const now = performance.now()

                if (now - updateTimestampRef.current >= animationFrameMs) {
                    const height = queueRef.current.shift()

                    if (height) {
                        setBlockHeight(height)
                        updateTimestampRef.current = now
                    }
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
        <BlockPanel
            {...props}
            blockHeight={blockHeight}
            reindexing={reindexing}
        />
    )
}

export default BlockPanelUpdater
