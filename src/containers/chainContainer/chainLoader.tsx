// istanbul ignore file
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { IbcChannels, Parameter, Parameters } from '@/components'
import { getIbcStats } from '@/lib/data'
import { classNames, formatNumber } from '@/lib/utils'

export interface Props {
    chainId?: string
    channelsClassName?: string
    clientId: string
    image: string
    name: string
    statsClassName?: string
}

const ChainLoader: FC<Props> = async props => {
    const stats = await getIbcStats({ clientId: props.clientId })

    if (stats?.length !== 1) {
        notFound()
    }

    const [connection] = stats

    return (
        <>
            <div
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-4 rounded-lg',
                    'p-6 backdrop-blur-lg',
                    props.channelsClassName
                )}
            >
                <h1
                    className={classNames(
                        'font-heading flex items-center gap-2 text-2xl',
                        'font-medium'
                    )}
                >
                    <Image
                        alt={props.name}
                        height={32}
                        src={props.image}
                        width={32}
                    />
                    <span className="truncate">{props.name}</span>
                </h1>
                <div
                    className={classNames(
                        'flex flex-col gap-1 font-mono text-sm font-medium'
                    )}
                >
                    <div>
                        <span className="text-text-secondary">chain-id </span>
                        <span>{props.chainId}</span>
                    </div>
                    <div>
                        <span className="text-text-secondary">client-id </span>
                        <span>{props.clientId}</span>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="flex flex-col gap-4">
                        <Parameters
                            className="bg-transparent p-0"
                            title="Shielded"
                        >
                            <Parameter name="Txs shielded">
                                {formatNumber(connection.shieldedTxCount)}
                            </Parameter>
                        </Parameters>
                        <Parameters
                            className="bg-transparent p-0"
                            title="Unshielded"
                        >
                            <Parameter name="Txs unshielded">
                                {formatNumber(connection.unshieldedTxCount)}
                            </Parameter>
                        </Parameters>
                    </div>
                    <Parameters
                        className="bg-transparent p-0 sm:col-2 lg:col-auto!"
                        title="Total"
                    >
                        <Parameter name="Txs total">
                            {formatNumber(
                                connection.shieldedTxCount +
                                    connection.unshieldedTxCount
                            )}
                        </Parameter>
                        <Parameter name="Txs pending">
                            {formatNumber(connection.pendingTxCount)}
                        </Parameter>
                        <Parameter name="Txs expired">
                            {formatNumber(connection.expiredTxCount)}
                        </Parameter>
                    </Parameters>
                </div>
            </div>
            {connection.channelId && connection.counterpartyChannelId && (
                <IbcChannels
                    chainImage={props.image}
                    chainName={props.name}
                    channelId={connection.channelId}
                    className={props.statsClassName}
                    counterpartyChannelId={connection.counterpartyChannelId}
                />
            )}
        </>
    )
}

export default ChainLoader
