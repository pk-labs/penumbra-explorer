/* istanbul ignore file */
import type { Metadata } from 'next'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    TransactionTable,
} from '@/components'
import { rootTitle } from '@/lib/constants'
import { loadTransactions } from '@/lib/loaders'

export const metadata: Metadata = {
    title: `Transactions - ${rootTitle}`,
}

const TransactionsPage: FC = async () => {
    const transactions = await loadTransactions(20)

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>Transactions</Breadcrumb>
            </Breadcrumbs>
            <TransactionTable transactions={transactions} time />
        </Container>
    )
}

export default TransactionsPage
