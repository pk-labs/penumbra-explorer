// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { BlockPanel } from '@/components'
import { useBlockUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { Props as BlockPanelContainerProps } from './blockPanelContainer'

interface Props extends BlockPanelContainerProps {
    number: number
}

const BlockPanelUpdater: FC<Props> = props => {
    const [number, setNumber] = useState(props.number)
    const [blockSubscription] = useBlockUpdateSubscription({
        variables: { limit: 1 },
    })
    const blockUpdate = blockSubscription.data?.latestBlocks

    useEffect(() => {
        if (blockUpdate) {
            setNumber(blockUpdate.height)
        }
    }, [blockUpdate])

    return <BlockPanel {...props} number={number} />
}

export default BlockPanelUpdater
