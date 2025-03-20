// istanbul ignore file
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    Pagination,
    TransactionTable,
} from '@/components'
import { appName, canonicalBaseUrl } from '@/lib/constants'
import { getTransactions } from '@/lib/data'
import { TransformedPartialTransactionFragment } from '@/lib/types'

const title = `Transactions - ${appName}`
const description =
    'Explore Penumbra blockchain blocks, transactions, and other data ' +
    'with Noctis - a fast, secure, and privacy-focused explorer built ' +
    'for Penumbra blockchain.'
const pathname = '/txs'

export const metadata: Metadata = {
    alternates: {
        canonical: canonicalBaseUrl + pathname,
    },
    description,
    openGraph: {
        description,
        title,
        url: pathname,
    },
    title,
    twitter: {
        description,
        title,
    },
}

interface Props {
    searchParams: Promise<{
        from?: string
    }>
}

const TransactionsPage: FC<Props> = async props => {
    const searchParams = await props.searchParams
    const fromParam = searchParams.from
    const limit = 20
    let transactions: TransformedPartialTransactionFragment[] | undefined
    let fromNext: string | undefined

    if (fromParam) {
        transactions = await getTransactions({
            range: { fromTxHash: fromParam.toUpperCase(), limit },
        })

        if (transactions?.length) {
            transactions.sort((a, b) => b.block.createdAt - a.block.createdAt)
            fromNext = transactions[transactions.length - 1].hash
        } else {
            redirect('/txs')
        }
    } else {
        transactions = await getTransactions({ latest: { limit } })

        if (transactions?.length) {
            fromNext = transactions[transactions.length - 1].hash
        }
    }

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>Transactions</Breadcrumb>
            </Breadcrumbs>
            <TransactionTable
                footer={<Pagination fromNext={fromNext} />}
                transactions={transactions}
                time
            />
        </Container>
    )
}

export default TransactionsPage
