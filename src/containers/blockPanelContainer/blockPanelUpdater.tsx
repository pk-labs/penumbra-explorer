// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe } from 'wonka'
import { BlockPanel } from '@/components'
import {
    BlockUpdateSubscription,
    BlockUpdateSubscriptionVariables,
} from '@/lib/graphql/generated/types'
import blockSubscription from '@/lib/graphql/subscriptions/blockSubscription.graphql'
import { throttleStream } from '@/lib/utils'
import { Props as BlockPanelContainerProps } from './blockPanelContainer'

interface Props extends BlockPanelContainerProps {
    blockHeight?: number
}

const BlockPanelUpdater: FC<Props> = props => {
    const client = useClient()
    const [blockHeight, setBlockHeight] = useState(props.blockHeight)
    const [reindexing, setReindexing] = useState(false)

    useEffect(() => {
        const source = client.subscription<
            BlockUpdateSubscription,
            BlockUpdateSubscriptionVariables
        >(blockSubscription, {})

        const subscription = pipe(
            throttleStream(source, 1000, 10),
            subscribe(results => {
                const latestResult = results.at(-1)
                const latestBlockHeight =
                    latestResult?.data?.latestBlocks.height

                if (latestBlockHeight) {
                    setBlockHeight(latestBlockHeight)
                    setReindexing(results.length > 2)
                }
            })
        )

        return () => subscription.unsubscribe()
    }, [client])

    return (
        <BlockPanel
            {...props}
            blockHeight={blockHeight}
            reindexing={reindexing}
        />
    )
}

export default BlockPanelUpdater
