// istanbul ignore file
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button, Container, Search } from '@/components'
import {
    LatestBlocksContainer,
    LatestTransactionsContainer,
    TransactionPanelContainer,
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
            <LatestBlocksContainer
                blockPanelClassName={twMerge(
                    'col-span-6 col-start-1 row-1 sm:col-span-3 sm:col-start-1'
                )}
                blockTableClassName={twMerge(
                    'col-span-6 col-start-1 row-3 lg:col-span-3 lg:row-2'
                )}
                limit={10}
            />
            <TransactionPanelContainer
                className={twMerge(
                    'col-span-6 col-start-1 row-2 sm:col-span-3',
                    'sm:col-start-4 sm:row-1'
                )}
            />
            <LatestTransactionsContainer
                actions={
                    <Button density="compact" href="/txs">
                        View All
                    </Button>
                }
                className={twMerge(
                    'col-span-6 col-start-1 row-4 lg:col-span-3',
                    'lg:col-start-4 lg:row-2'
                )}
                limit={10}
                title="Latest transactions"
            />
        </Container>
    </>
)

export default HomePage
