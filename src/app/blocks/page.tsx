/* istanbul ignore file */
import type { Metadata } from 'next'
import { FC } from 'react'
import { blocks } from '../../__tests__/__fixtures__'
import {
    BlockTable,
    Breadcrumb,
    Breadcrumbs,
    Container,
} from '../../components'
import { rootTitle } from '../../lib/constants'

const paginatedBlocks = blocks.slice(0, 20)

export const metadata: Metadata = {
    title: `Blocks - ${rootTitle}`,
}

const BlocksPage: FC = async () => (
    <Container>
        <Breadcrumbs>
            <Breadcrumb href="/">Explorer</Breadcrumb>
            <Breadcrumb>Blocks</Breadcrumb>
        </Breadcrumbs>
        <BlockTable blocks={paginatedBlocks} proposer />
    </Container>
)

export const revalidate = 1
export default BlocksPage
