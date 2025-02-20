/* istanbul ignore file */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { transactions } from '../../../__tests__/__fixtures__'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    TransactionView,
} from '../../../components'
import { rootTitle } from '../../../lib/constants'

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
    const transaction = transactions.find(t => t.id === params.transactionId)

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

export const revalidate = 1
export default TransactionViewPage
