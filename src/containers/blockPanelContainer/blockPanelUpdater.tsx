// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { BlockPanel } from '@/components'
import { useBlockUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { Props as BlockPanelContainerProps } from './blockPanelContainer'

interface Props extends BlockPanelContainerProps {
    blockHeight?: number
}

const BlockPanelUpdater: FC<Props> = props => {
    const [blockHeight, setBlockHeight] = useState(props.blockHeight)
    const [blockSubscription] = useBlockUpdateSubscription({
        variables: { limit: 1 },
    })
    const blockUpdate = blockSubscription.data?.latestBlocks

    useEffect(() => {
        if (blockUpdate) {
            setBlockHeight(blockUpdate.height)
        }
    }, [blockUpdate])

    return <BlockPanel {...props} blockHeight={blockHeight} />
}

export default BlockPanelUpdater
