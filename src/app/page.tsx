// istanbul ignore file
import { FC } from 'react'
import { Button, Container } from '@/components'
import {
    ActiveProposalPanelContainer,
    BlockPanelContainer,
    BlockTableContainer,
    SearchContainer,
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

const HomePage: FC = () => (
    <>
        <Container>
            <h1 className="font-heading mb-2 text-4xl font-medium">
                Penumbra Blockchain Explorer
            </h1>
            <GraphqlClientProvider>
                <SearchContainer />
            </GraphqlClientProvider>
        </Container>
        <Container className="flex flex-col gap-4">
            <div>
                <ActiveProposalPanelContainer />
                <div className="flex flex-col gap-4 md:flex-row">
                    <BlockPanelContainer className="flex-1" />
                    <TransactionPanelContainer className="flex-1" />
                </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
                <BlockTableContainer
                    className="flex-1"
                    header={
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-medium">
                                Latest blocks
                            </h2>
                            <Button density="compact" href="/blocks">
                                View all
                            </Button>
                        </div>
                    }
                    limit={{ length: 10 }}
                    subscription
                />
                <TransactionTableContainer
                    className="flex-1"
                    header={
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-medium">
                                Latest transactions
                            </h2>
                            <Button density="compact" href="/txs">
                                View all
                            </Button>
                        </div>
                    }
                    limit={{ length: 10 }}
                    blockHeight
                    subscription
                />
            </div>
        </Container>
    </>
)

export default HomePage
