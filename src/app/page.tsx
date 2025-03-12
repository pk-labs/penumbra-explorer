// istanbul ignore file
import { FC } from 'react'
import {
    BlockPanel,
    BlockTable,
    Button,
    Container,
    Search,
    TransactionPanel,
    TransactionTable,
} from '@/components'
import { getBlocks, getStats, getTransactions } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import styles from './page.module.css'

const HomePage: FC = async () => {
    const stats = await getStats()
    const latestBlocks = await getBlocks({ latest: { limit: 10 } })
    const latestTransactions = await getTransactions({ latest: { limit: 10 } })

    let latestBlockHeight

    if (latestBlocks?.length) {
        latestBlockHeight = latestBlocks[0].height
    }

    return (
        <>
            <Container>
                <h1 className={styles.title}>Penumbra Blockchain Explorer</h1>
                <GraphqlClientProvider>
                    <Search />
                </GraphqlClientProvider>
            </Container>
            <Container className="grid grid-cols-6 gap-4">
                <BlockPanel className="col-span-3" number={latestBlockHeight} />
                <TransactionPanel
                    className="col-span-3"
                    number={stats?.totalTransactionsCount}
                />
                <BlockTable
                    actions={<Button href="/blocks">View all</Button>}
                    blocks={latestBlocks}
                    className="col-span-3"
                    title="Latest blocks"
                />
                <TransactionTable
                    actions={<Button href="/txs">View all</Button>}
                    className="col-span-3"
                    title="Latest transactions"
                    transactions={latestTransactions}
                />
            </Container>
        </>
    )
}

export default HomePage
