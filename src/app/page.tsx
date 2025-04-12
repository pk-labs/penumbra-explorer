// istanbul ignore file
import { FC } from 'react'
import { Button, Container, Search } from '@/components'
import {
    BlockPanelContainer,
    LatestBlocksContainer,
    TransactionPanelContainer,
    TransactionTableContainer,
} from '@/containers'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Noctis',
    'Explore Penumbra blockchain blocks, transactions, and other data with ' +
        'Noctis - a fast, secure, and privacy-focused explorer built for ' +
        'Penumbra blockchain.',
    '/'
)

const HomePage: FC = async () => (
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
            <BlockPanelContainer className="col-span-6 sm:col-span-3" />
            <TransactionPanelContainer className="col-span-6 sm:col-span-3" />
            <LatestBlocksContainer
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

export default HomePage
