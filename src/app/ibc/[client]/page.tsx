// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { ClientContainer, TransactionTableContainer } from '@/containers'
import ibc from '@/lib/ibc'
import { classNames, generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ client: string }>
    searchParams: Promise<{ page?: string }>
}

export const generateMetadata = async (props: Props) => {
    const params = await props.params
    const client = ibc.find(c => c.slug === params.client)
    const name = client?.name ?? params.client

    return generatePageMetadata(
        `${name} IBC connection`,
        `Explore the ${name} IBC connection to the Penumbra blockchain. View ` +
            'client ID, channel ID and transaction information on Noctis - ' +
            'a fast, secure and privacy-focused explorer built for Penumbra ' +
            'blockchain.',
        `/ibc/${client}`
    )
}

const ClientPage: FC<Props> = async props => {
    const params = await props.params
    const client = ibc.find(c => c.slug === params.client)
    const id = client?.id ?? params.client
    const name = client?.name ?? 'Unknown'

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
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb href="/ibc">IBC Chains</Breadcrumb>
            </Breadcrumbs>
            <div
                className={classNames(
                    'grid items-start gap-4 lg:grid-cols-[300px_1fr]',
                    'xl:grid-cols-[380px_1fr]'
                )}
            >
                <ClientContainer
                    chainId={client?.chainId}
                    channelsClassName="lg:col-2 lg:row-1"
                    id={id}
                    image={client?.image}
                    name={name}
                    statsClassName="lg:col-1 lg:row-span-2"
                />
                <TransactionTableContainer
                    className="min-w-0"
                    filter={{ clientId: id }}
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
                    limit={{ length, offset }}
                    // amount
                    blockHeight
                    pagination
                    // status
                    time
                />
            </div>
        </Container>
    )
}

export default ClientPage
