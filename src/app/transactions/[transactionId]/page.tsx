/* istanbul ignore file */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    TransactionView,
} from '../../../components'
import { rootTitle } from '../../../lib/constants'
import { loadTransaction } from '../../../lib/loaders'

interface Props {
    params: Promise<{
        transactionId: string
    }>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => ({
    title: `Transaction ${(await props.params).transactionId} - ${rootTitle}`,
})

const TransactionViewPage: FC<Props> = async props => {
    const params = await props.params

    const transaction = await loadTransaction(
        params.transactionId.toUpperCase()
    )

    if (!transaction) {
        notFound()
    }

    return (
        <Container narrow>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/transactions">Transactions</Breadcrumb>
            </Breadcrumbs>
            <TransactionView
                subtitle={transaction.hash}
                title="Transaction view"
                transaction={transaction}
            />
        </Container>
    )
}

export default TransactionViewPage
