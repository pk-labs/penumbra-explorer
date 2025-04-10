import { FC } from 'react'
import {
    BlockPanel,
    Button,
    Container,
    Search,
    Skeleton,
    Table,
    TableCell,
    TableRow,
    TransactionPanel,
} from '@/components'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'

const HomePageLoading: FC = () => {
    const skeletonTableChildren = (
        <>
            <thead>
                <TableRow>
                    <TableCell header>
                        <Skeleton className="h-6" />
                    </TableCell>
                </TableRow>
            </thead>
            <tbody>
                {Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Skeleton className="h-6" />
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
        </>
    )

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
                <BlockPanel className="col-span-6 sm:col-span-3" number={0} />
                <TransactionPanel
                    className="col-span-6 sm:col-span-3"
                    number={0}
                />
                <Table
                    actions={
                        <Button density="compact" href="/blocks">
                            View All
                        </Button>
                    }
                    className="col-span-6 lg:col-span-3"
                    title="Latest blocks"
                >
                    {skeletonTableChildren}
                </Table>
                <Table
                    actions={
                        <Button density="compact" href="/txs">
                            View All
                        </Button>
                    }
                    className="col-span-6 lg:col-span-3"
                    title="Latest transactions"
                >
                    {skeletonTableChildren}
                </Table>
            </Container>
        </>
    )
}

export default HomePageLoading
