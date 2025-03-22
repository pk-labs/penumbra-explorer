// istanbul ignore file
import { redirect } from 'next/navigation'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    Pagination,
    TransactionTable,
} from '@/components'
import { getTransactions } from '@/lib/data'
import { RangeDirection } from '@/lib/graphql/generated/types'
import { TransformedPartialTransactionFragment } from '@/lib/types'
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
    const fromParam = searchParams.from
    const limit = 20
    let transactions: TransformedPartialTransactionFragment[] | undefined
    let fromNext: string | undefined
    let fromPrev: string | undefined

    if (fromParam) {
        const latestTransactions = await getTransactions({
            latest: { limit: 1 },
        })

        if (
            latestTransactions?.length &&
            fromParam === latestTransactions[0].hash
        ) {
            redirect('/txs')
        } else {
            transactions = await getTransactions({
                range: { fromTxHash: fromParam.toUpperCase(), limit },
            })

            if (transactions?.length) {
                fromNext = transactions[transactions.length - 1].hash

                const prevTransactions = await getTransactions({
                    range: {
                        direction: RangeDirection.Previous,
                        fromTxHash: fromParam.toUpperCase(),
                        limit,
                    },
                })

                console.log('prevTransactions:', prevTransactions?.length)
                prevTransactions?.forEach(tx => console.log(tx.hash))

                if (prevTransactions?.length) {
                    fromPrev = prevTransactions[0].hash
                }
            } else {
                redirect('/txs')
            }
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
                footer={<Pagination fromNext={fromNext} fromPrev={fromPrev} />}
                transactions={transactions}
                time
            />
        </Container>
    )
}

export default TransactionsPage
