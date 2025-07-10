// istanbul ignore file
import { FC } from 'react'
import { Button, Container } from '@/components'
import {
    BlockPanelContainer,
    BlockTableContainer,
    SearchContainer,
    TransactionPanelContainer,
    TransactionTableContainer,
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

// FIXME: Extra spacing between panels and tables above md and below lg
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
        <Container className="grid grid-cols-6 gap-4">
            <BlockPanelContainer
                className={classNames(
                    'col-span-6 col-start-1 row-1 md:col-span-3 md:col-start-1'
                )}
            />
            <BlockTableContainer
                className={classNames(
                    'col-span-6 col-start-1 row-4 lg:col-span-3 lg:row-2'
                )}
                header={
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-medium">Latest blocks</h2>
                        <Button density="compact" href="/blocks">
                            View all
                        </Button>
                    </div>
                }
                limit={{ length: 10 }}
                subscription
            />
            <TransactionPanelContainer
                className={classNames(
                    'col-span-6 col-start-1 row-2 md:col-span-3',
                    'md:col-start-4 md:row-1'
                )}
            />
            {/*<ShieldedPanelContainer*/}
            {/*    className={classNames(*/}
            {/*        'col-span-6 col-start-1 row-3 lg:col-span-2',*/}
            {/*        'lg:col-start-5 lg:row-1'*/}
            {/*    )}*/}
            {/*/>*/}
            <TransactionTableContainer
                className={classNames(
                    'col-span-6 col-start-1 row-5 lg:col-span-3',
                    'lg:col-start-4 lg:row-2'
                )}
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
        </Container>
    </>
)

export default HomePage
