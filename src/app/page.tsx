/* istanbul ignore file */
import { FC } from 'react'
import {
    BlockPanel,
    BlockTable,
    BurnPanel,
    Button,
    Container,
    Search,
    TransactionPanel,
    TransactionTable,
} from '@/components'
import { loadBlocks, loadTransactions } from '@/lib/loaders'
import styles from './page.module.css'

const HomePage: FC = async () => {
    const latestBlocks = await loadBlocks({ latest: { limit: 10 } })
    const latestTransactions = await loadTransactions({ latest: { limit: 10 } })

    return (
        <>
            <Container>
                <h1 className={styles.title}>Penumbra Blockchain Explorer</h1>
                <Search />
            </Container>
            <Container>
                <div className={styles.dashboard}>
                    <BlockPanel />
                    <TransactionPanel />
                    <BurnPanel />
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
