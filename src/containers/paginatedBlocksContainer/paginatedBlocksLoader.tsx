// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { BlockTable, Pagination } from '@/components'
import { getBlocks } from '@/lib/data'
import { Props } from './paginatedBlocksContainer'

const PaginatedBlocksLoader: FC<Props> = async ({
    length,
    offset,
    pathname,
    ...props
}) => {
    const { blocks, total } = await getBlocks({ length, offset })

    if (!blocks?.length) {
        notFound()
    }

    const page = offset / length + 1
    const totalPages = Math.ceil(total / length)

    return (
        <BlockTable
            blocks={blocks}
            footer={
                <Pagination
                    page={page}
                    pathname={pathname}
                    totalPages={totalPages}
                />
            }
            {...props}
        />
    )
}

export default PaginatedBlocksLoader
