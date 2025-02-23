/* istanbul ignore file */
import { Metadata } from 'next'
import { FC } from 'react'
import { BlockTable, Breadcrumb, Breadcrumbs, Container } from '@/components'
import { rootTitle } from '@/lib/constants'
import { loadBlocks } from '@/lib/loaders'

export const metadata: Metadata = {
    title: `Blocks - ${rootTitle}`,
}

const BlocksPage: FC = async () => {
    const blocks = await loadBlocks(20)

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>Blocks</Breadcrumb>
            </Breadcrumbs>
            <BlockTable blocks={blocks} proposer />
        </Container>
    )
}

export default BlocksPage
