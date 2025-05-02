// istanbul ignore file
import { FC } from 'react'
import { Container, Search, ShieldedPanel } from '@/components'
import {
    LatestBlocksContainer,
    LatestTransactionsContainer,
    TransactionPanelContainer,
} from '@/containers'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { classNames, generatePageMetadata } from '@/lib/utils'

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
                blockPanelClassName={classNames(
                    'col-span-6 col-start-1 row-1 lg:col-span-2 lg:col-start-1'
                )}
                blockTableClassName={classNames(
                    'col-span-6 col-start-1 row-4 lg:col-span-3 lg:row-2'
                )}
                limit={10}
            />
            <TransactionPanelContainer
                className={classNames(
                    'col-span-6 col-start-1 row-2 lg:col-span-2',
                    'lg:col-start-3 lg:row-1'
                )}
            />
            <ShieldedPanel
                className={classNames(
                    'col-span-6 col-start-1 row-3 lg:col-span-2',
                    'lg:col-start-5 lg:row-1'
                )}
                number={123}
            />
            <LatestTransactionsContainer
                className={classNames(
                    'col-span-6 col-start-1 row-5 lg:col-span-3',
                    'lg:col-start-4 lg:row-2'
                )}
                limit={10}
                blockHeight
            />
        </Container>
    </>
)

export default HomePage
