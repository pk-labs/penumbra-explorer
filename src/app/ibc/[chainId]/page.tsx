// istanbul ignore file
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    Parameter,
    Parameters,
} from '@/components'
import { PaginatedTransactionsContainer } from '@/containers'
import { ibc } from '@/lib/constants'
import { classNames, formatNumber, generatePageMetadata } from '@/lib/utils'

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
                <div
                    className={classNames(
                        'bg-other-tonalFill5 flex flex-col gap-4 rounded-lg',
                        'p-6 backdrop-blur-lg lg:col-1 lg:row-span-2'
                    )}
                >
                    <h1
                        className={classNames(
                            'font-heading flex items-center gap-2 text-4xl',
                            'font-medium'
                        )}
                    >
                        <Image
                            alt={connection.name}
                            height={32}
                            src={connection.image}
                            width={32}
                        />
                        <span className="truncate">{connection.name}</span>
                    </h1>
                    <div
                        className={classNames(
                            'flex flex-col gap-1 font-mono text-sm font-medium'
                        )}
                    >
                        <div>
                            <span className="text-text-secondary">
                                chain-id{' '}
                            </span>
                            <span>{connection.chainId}</span>
                        </div>
                        <div>
                            <span className="text-text-secondary">
                                client-id{' '}
                            </span>
                            <span>???</span>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-4">
                            <Parameters
                                className="bg-transparent p-0"
                                title="Shielded"
                            >
                                <Parameter name="Volume shielded">
                                    ${formatNumber(connection.volumeShielded)}
                                </Parameter>
                                <Parameter name="Txs shielded">
                                    {formatNumber(connection.txsShielded)}
                                </Parameter>
                            </Parameters>
                            <Parameters
                                className="bg-transparent p-0"
                                title="Unshielded"
                            >
                                <Parameter name="Volume unshielded">
                                    ${formatNumber(connection.volumeUnshielded)}
                                </Parameter>
                                <Parameter name="Txs unshielded">
                                    {formatNumber(connection.txsUnshielded)}
                                </Parameter>
                            </Parameters>
                        </div>
                        <Parameters
                            className="bg-transparent p-0 sm:col-2 lg:col-auto!"
                            title="Total"
                        >
                            <Parameter name="Volume total">
                                $
                                {formatNumber(
                                    connection.volumeShielded +
                                        connection.volumeUnshielded
                                )}
                            </Parameter>
                            <Parameter name="Txs total">
                                {formatNumber(
                                    connection.txsShielded +
                                        connection.txsUnshielded
                                )}
                            </Parameter>
                            <Parameter name="Txs pending">
                                {formatNumber(connection.txsPending)}
                            </Parameter>
                            <Parameter name="Txs expired">
                                {formatNumber(connection.txsExpired)}
                            </Parameter>
                        </Parameters>
                    </div>
                </div>
                <div
                    className={classNames(
                        'bg-other-tonalFill5 h-[106px] rounded-lg p-6',
                        'backdrop-blur-lg lg:col-2 lg:row-1'
                    )}
                />
                <PaginatedTransactionsContainer
                    className="min-w-0"
                    header={
                        <h2
                            className={classNames(
                                'font-heading text-4xl font-medium lg:col-2',
                                'lg:row-2'
                            )}
                        >
                            Transactions
                        </h2>
                    }
                    length={length}
                    offset={offset}
                    pathname={`/ibc/${params.chainId}`}
                    blockHeight
                    status
                    time
                />
            </div>
        </Container>
    )
}

export default ChainPage
