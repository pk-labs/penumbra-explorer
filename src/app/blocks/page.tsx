/* istanbul ignore file */
import { Metadata } from 'next'
import { FC } from 'react'
import {
    BlockTable,
    Breadcrumb,
    Breadcrumbs,
    Container,
    Pagination,
} from '@/components'
import { rootTitle } from '@/lib/constants'
import { loadBlocks } from '@/lib/loaders'

export const metadata: Metadata = {
    title: `Blocks - ${rootTitle}`,
}

const BlocksPage: FC = async () => {
    const blocks = await loadBlocks({ latest: { limit: 20 } })
    const totalItems = blocks?.length ? blocks[0].height : undefined

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>Blocks</Breadcrumb>
            </Breadcrumbs>
            <BlockTable
                blocks={blocks}
                footer={
                    <Pagination
                        itemsPerPage={20}
                        page={1}
                        totalItems={totalItems}
                    />
                }
            />
        </Container>
    )
}

export default BlocksPage
