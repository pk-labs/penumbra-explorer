// istanbul ignore file
import { FC } from 'react'
import {
    BlockPanel,
    BlockTableContainer,
    Button,
    Container,
    Search,
    TransactionPanel,
    TransactionTableContainer,
} from '@/components'
import { getBlocks, getStats } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Noctis',
    'Explore Penumbra blockchain blocks, transactions, and other data with ' +
        'Noctis - a fast, secure, and privacy-focused explorer built for ' +
        'Penumbra blockchain.',
    '/'
)

const HomePage: FC = async () => {
    const stats = await getStats()
    const latestBlocks = await getBlocks({ latest: { limit: 1 } })

    let latestBlockHeight

    if (latestBlocks?.length) {
        latestBlockHeight = latestBlocks[0].height
    }

    return (
        <>
            <Container>
                <h1 className="font-heading mb-2 text-4xl font-medium">
                    Penumbra Blockchain Explorer
                </h1>
                <GraphqlClientProvider>
                    <Search />
                </GraphqlClientProvider>
            </Container>
            <Container className="grid grid-cols-6 gap-4">
                <BlockPanel
                    className="col-span-6 sm:col-span-3"
                    number={latestBlockHeight}
                />
                <TransactionPanel
                    className="col-span-6 sm:col-span-3"
                    number={stats?.totalTransactionsCount}
                />
                <BlockTableContainer
                    actions={
                        <Button density="compact" href="/blocks">
                            View All
                        </Button>
                    }
                    className="col-span-6 lg:col-span-3"
                    limit={10}
                    title="Latest blocks"
                />
                <TransactionTableContainer
                    actions={
                        <Button density="compact" href="/txs">
                            View All
                        </Button>
                    }
                    className="col-span-6 lg:col-span-3"
                    limit={10}
                    title="Latest transactions"
                />
            </Container>
        </>
    )
}

export default HomePage
