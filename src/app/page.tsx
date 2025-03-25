// istanbul ignore file
import { FC } from 'react'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Noctis',
    'Explore Penumbra blockchain blocks, transactions, and other data with ' +
        'Noctis - a fast, secure, and privacy-focused explorer built for ' +
        'Penumbra blockchain.',
    '/'
)

const HomePage: FC = async () => {
    return <div>Oops, something went wrong!</div>

    // const stats = await getStats()
    // const latestBlocks = await getBlocks({ latest: { limit: 10 } })
    // const latestTransactions = await getTransactions({ latest: { limit: 10 } })
    //
    // let latestBlockHeight
    //
    // if (latestBlocks?.length) {
    //     latestBlockHeight = latestBlocks[0].height
    // }
    //
    // return (
    //     <>
    //         <Container>
    //             <h1 className="font-secondary mb-2 text-4xl font-medium">
    //                 Penumbra Blockchain Explorer
    //             </h1>
    //             <GraphqlClientProvider>
    //                 <Search />
    //             </GraphqlClientProvider>
    //         </Container>
    //         <Container className="grid grid-cols-6 gap-4">
    //             <BlockPanel
    //                 className="col-span-6 sm:col-span-3"
    //                 number={latestBlockHeight}
    //             />
    //             <TransactionPanel
    //                 className="col-span-6 sm:col-span-3"
    //                 number={stats?.totalTransactionsCount}
    //             />
    //             <BlockTable
    //                 actions={<Button href="/blocks">View all</Button>}
    //                 blocks={latestBlocks}
    //                 className="col-span-6 lg:col-span-3"
    //                 title="Latest blocks"
    //             />
    //             <TransactionTable
    //                 actions={<Button href="/txs">View all</Button>}
    //                 className="col-span-6 lg:col-span-3"
    //                 title="Latest transactions"
    //                 transactions={latestTransactions}
    //             />
    //         </Container>
    //     </>
    // )
}

export default HomePage
