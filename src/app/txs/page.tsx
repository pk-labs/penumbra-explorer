/* istanbul ignore file */
import { Metadata } from 'next'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    Pagination,
    TransactionTable,
} from '@/components'
import { rootTitle } from '@/lib/constants'
import { loadTransactions } from '@/lib/loaders'

export const metadata: Metadata = {
    title: `Transactions - ${rootTitle}`,
}

const TransactionsPage: FC = async () => {
    const transactions = await loadTransactions({ latest: { limit: 20 } })

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>Transactions</Breadcrumb>
            </Breadcrumbs>
            <TransactionTable
                footer={<Pagination itemsPerPage={20} page={1} />}
                transactions={transactions}
                time
            />
        </Container>
    )
}

export default TransactionsPage
