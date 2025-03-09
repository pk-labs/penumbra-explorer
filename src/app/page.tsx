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
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { loadBlocks, loadStats, loadTransactions } from '@/lib/loaders'
import styles from './page.module.css'

const HomePage: FC = async () => {
    const stats = await loadStats()
    const latestBlocks = await loadBlocks({ latest: { limit: 10 } })
    const latestTransactions = await loadTransactions({ latest: { limit: 10 } })

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
            <Container>
                <div className={styles.dashboard}>
                    <BlockPanel number={latestBlockHeight} />
                    <TransactionPanel number={stats?.totalTransactionsCount} />
                    {/*<BurnPanel />*/}
                    <BlockTable
                        actions={<Button href="/blocks">View all</Button>}
                        blocks={latestBlocks}
                        title="Latest blocks"
                    />
                    <TransactionTable
                        actions={<Button href="/txs">View all</Button>}
                        title="Latest transactions"
                        transactions={latestTransactions}
                    />
                </div>
            </Container>
        </>
    )
}

export default HomePage
