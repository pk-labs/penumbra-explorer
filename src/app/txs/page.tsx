// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { PaginatedTransactionsContainer } from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Transactions',
    'Explore Penumbra blockchain blocks, transactions, and other data with ' +
        'Noctis - a fast, secure, and privacy-focused explorer built for ' +
        'Penumbra blockchain.',
    '/txs'
)

interface Props {
    searchParams: Promise<{
        from?: string
    }>
}

const TransactionsPage: FC<Props> = async props => {
    const searchParams = await props.searchParams

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>Transactions</Breadcrumb>
            </Breadcrumbs>
            <PaginatedTransactionsContainer
                from={searchParams.from}
                limit={20}
                pathname="/txs"
                time
            />
        </Container>
    )
}

export default TransactionsPage
