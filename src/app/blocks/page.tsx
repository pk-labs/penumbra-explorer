// istanbul ignore file
import { FC } from 'react'
import {
    BlockTableContainer,
    Breadcrumb,
    Breadcrumbs,
    Container,
} from '@/components'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Blocks',
    'Explore Penumbra blockchain blocks, transactions, and other data with ' +
        'Noctis - a fast, secure, and privacy-focused explorer built for ' +
        'Penumbra blockchain.',
    '/blocks'
)

interface Props {
    searchParams: Promise<{
        from?: string
    }>
}

const BlocksPage: FC<Props> = async props => {
    const searchParams = await props.searchParams

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>Blocks</Breadcrumb>
            </Breadcrumbs>
            <BlockTableContainer
                limit={20}
                pagination={{
                    from: Number(searchParams.from),
                    pathname: '/blocks',
                }}
            />
        </Container>
    )
}

export default BlocksPage
