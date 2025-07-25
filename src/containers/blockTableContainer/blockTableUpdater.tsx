// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { BlockTable, Pagination } from '@/components'
import dayjs from '@/lib/dayjs'
import { useBlockUpdateSubscription } from '@/lib/graphql/generated/hooks'
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
    const [blocks, setBlocks] = useState(props.blocks)
    const [blockSubscription] = useBlockUpdateSubscription({
        pause: !subscription,
        variables: { limit: limit.length },
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

                return [
                    {
                        height: blockUpdate.height,
                        timestamp: dayjs(blockUpdate.createdAt).valueOf(),
                        transactionsCount: blockUpdate.transactionsCount,
                    },
                    ...prev.slice(0, -1),
                ]
            })
        }
    }, [blockUpdate])

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
