// istanbul ignore file
import { redirect } from 'next/navigation'
import { FC } from 'react'
import { BlockTable, BlockTableProps, Pagination } from '@/components'
import { getBlocks } from '@/lib/data'
import { PartialBlockFragment } from '@/lib/graphql/generated/types'

export interface Props extends Omit<BlockTableProps, 'blocks' | 'footer'> {
    from: number
    limit: number
    pathname: string
}

const PaginatedBlocksLoader: FC<Props> = async ({
    from,
    limit,
    pathname,
    ...props
}) => {
    let blocks: PartialBlockFragment[] | undefined
    let fromNext: number | undefined
    let fromPrev: number | undefined

    if (Number.isInteger(from)) {
        blocks = await getBlocks({
            range: { from, to: from + limit - 1 },
        })

        if (blocks?.length) {
            fromPrev = from + limit

            fromNext =
                blocks[blocks.length - 1].height > 1
                    ? Math.max(from - limit, 1)
                    : undefined
        } else {
            redirect(pathname)
        }
    } else {
        blocks = await getBlocks({ latest: { limit } })

        if (blocks?.length) {
            const { height } = blocks[blocks.length - 1]
            fromNext = height > 1 ? Math.max(height - limit, 1) : undefined
        }
    }

    return (
        <BlockTable
            blocks={blocks}
            footer={
                <Pagination
                    fromNext={fromNext?.toString()}
                    fromPrev={fromPrev?.toString()}
                    pathname={pathname}
                />
            }
            {...props}
        />
    )
}

export default PaginatedBlocksLoader
