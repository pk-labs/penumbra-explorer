// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { ChainContainer, PaginatedTransactionsContainer } from '@/containers'
import ibc from '@/lib/ibc'
import { classNames, generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ chainId: string }>
    searchParams: Promise<{ page?: string }>
}

export const generateMetadata = async (props: Props) => {
    const { chainId } = await props.params

    return generatePageMetadata(
        `Chain ${chainId}`,
        'TODO: Description',
        `/ibc/${chainId}`
    )
}

const ChainPage: FC<Props> = async props => {
    const params = await props.params
    const connection = ibc.find(c => c.chainId === params.chainId)

    if (!connection) {
        notFound()
    }

    const searchParams = await props.searchParams
    const page = searchParams.page ? Number(searchParams.page) - 1 : 0

    if (Number.isNaN(page) || page < 0) {
        notFound()
    }

    const length = 20
    const offset = page * length

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/ibc">IBC Chains</Breadcrumb>
            </Breadcrumbs>
            <div
                className={classNames(
                    'grid items-start gap-4 lg:grid-cols-[300px_1fr]',
                    'xl:grid-cols-[380px_1fr]'
                )}
            >
                <ChainContainer
                    {...connection}
                    channelsClassName="lg:col-1 lg:row-span-2"
                    statsClassName="lg:col-2 lg:row-1"
                />
                <PaginatedTransactionsContainer
                    className="min-w-0"
                    clientId={connection.clientId}
                    header={
                        <h2
                            className={classNames(
                                'font-heading text-2xl font-medium lg:col-2',
                                'lg:row-2'
                            )}
                        >
                            Transactions
                        </h2>
                    }
                    length={length}
                    offset={offset}
                    pathname={`/ibc/${params.chainId}`}
                    amount
                    blockHeight
                    status
                    time
                />
            </div>
        </Container>
    )
}

export default ChainPage
