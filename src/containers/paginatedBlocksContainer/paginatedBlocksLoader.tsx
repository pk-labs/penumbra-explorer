// istanbul ignore file
import { redirect } from 'next/navigation'
import { FC } from 'react'
import { BlockTable, BlockTableProps, Pagination } from '@/components'
import { getBlocks } from '@/lib/data'

export interface Props extends Omit<BlockTableProps, 'blocks' | 'footer'> {
    length: number
    offset: number
    pathname: string
}

const PaginatedBlocksLoader: FC<Props> = async ({
    length,
    offset,
    pathname,
    ...props
}) => {
    const blocks = await getBlocks({ length, offset })

    if (!blocks?.length) {
        redirect(pathname)
    }

    return (
        <BlockTable
            blocks={blocks}
            footer={<Pagination pathname={pathname} />}
            {...props}
        />
    )
}

export default PaginatedBlocksLoader
