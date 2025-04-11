// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    TransactionViewContainer,
} from '@/components'
import { generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ hash: string }>
}

export const generateMetadata = async (props: Props) => {
    const { hash } = await props.params

    return generatePageMetadata(
        `Transaction ${hash}`,
        `Explore ${hash} transaction parameters, actions, and other data ` +
            'with Noctis - a fast, secure, and privacy-focused explorer ' +
            'built for Penumbra blockchain.',
        `/tx/${hash}`
    )
}

const TransactionViewPage: FC<Props> = async props => {
    const params = await props.params

    if (!params.hash) {
        notFound()
    }

    return (
        <Container narrow>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/txs">Transactions</Breadcrumb>
            </Breadcrumbs>
            <TransactionViewContainer transactionHash={params.hash} />
        </Container>
    )
}

export default TransactionViewPage
