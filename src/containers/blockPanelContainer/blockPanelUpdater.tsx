// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe, throttle } from 'wonka'
import { BlockPanel } from '@/components'
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
    const [blockHeight, setBlockHeight] = useState(props.blockHeight)

    useEffect(() => {
        const source = client.subscription<
            BlockUpdateSubscription,
            BlockUpdateSubscriptionVariables
        >(blockSubscription, { limit: 1 })

        const subscription = pipe(
            source,
            throttle(() => 1000),
            subscribe(result => {
                const blockUpdate = result.data?.latestBlocks

                if (blockUpdate) {
                    setBlockHeight(blockUpdate.height)
                }
            })
        )

        return () => subscription.unsubscribe()
    }, [client])

    return <BlockPanel {...props} blockHeight={blockHeight} />
}

export default BlockPanelUpdater
