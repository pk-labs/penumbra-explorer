// istanbul ignore file
import { redirect } from 'next/navigation'
import { FC } from 'react'
import { BlockTable, BlockTableProps, Pagination } from '@/components'
import { getBlocks } from '@/lib/data'
import { PartialBlockFragment } from '@/lib/graphql/generated/types'

export interface Props extends Omit<BlockTableProps, 'blocks' | 'footer'> {
    limit: number
    pagination?: {
        from: number
        pathname: string
    }
}

const BlockTableLoader: FC<Props> = async ({ limit, pagination, ...props }) => {
    let blocks: PartialBlockFragment[] | undefined
    let fromNext: number | undefined
    let fromPrev: number | undefined

    if (pagination && Number.isInteger(pagination.from)) {
        blocks = await getBlocks({
            range: { from: pagination.from, to: pagination.from + limit - 1 },
        })

        if (blocks?.length) {
            fromPrev = pagination.from + limit

            fromNext =
                blocks[blocks.length - 1].height > 1
                    ? Math.max(pagination.from - limit, 1)
                    : undefined
        } else {
            redirect(pagination.pathname)
        }
    } else {
        blocks = await getBlocks({ latest: { limit } })

        if (pagination && blocks?.length) {
            const { height } = blocks[blocks.length - 1]
            fromNext = height > 1 ? Math.max(height - limit, 1) : undefined
        }
    }

    return (
        <BlockTable
            blocks={blocks}
            footer={
                pagination ? (
                    <Pagination
                        fromNext={fromNext?.toString()}
                        fromPrev={fromPrev?.toString()}
                        pathname={pagination.pathname}
                    />
                ) : undefined
            }
            {...props}
        />
    )
}

export default BlockTableLoader
