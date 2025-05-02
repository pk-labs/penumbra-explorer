// istanbul ignore file
import { CheckIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FC, Fragment } from 'react'
import { Parameter, Parameters } from '@/components'
import { getIbcChannelPairs, getIbcStats } from '@/lib/data'
import { classNames, formatNumber } from '@/lib/utils'

export interface Props {
    chainId: string
    clientId: string
    connectionPanelClassName?: string
    image: string
    name: string
    statsPanelClassName?: string
}

const ChainLoader: FC<Props> = async props => {
    const [stats, pairs] = await Promise.all([
        getIbcStats({ clientId: props.clientId }),
        getIbcChannelPairs(props.clientId),
    ])

    if (stats?.length !== 1 || !pairs?.length) {
        notFound()
    }

    const [connection] = stats

    return (
        <>
            <div
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-4 rounded-lg',
                    'p-6 backdrop-blur-lg',
                    props.statsPanelClassName
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
                            <Parameter name="Volume shielded">
                                $
                                {formatNumber(
                                    Number(connection.shieldedVolume)
                                )}
                            </Parameter>
                            <Parameter name="Txs shielded">
                                {formatNumber(connection.shieldedTxCount)}
                            </Parameter>
                        </Parameters>
                        <Parameters
                            className="bg-transparent p-0"
                            title="Unshielded"
                        >
                            <Parameter name="Volume unshielded">
                                $
                                {formatNumber(
                                    Number(connection.unshieldedVolume)
                                )}
                            </Parameter>
                            <Parameter name="Txs unshielded">
                                {formatNumber(connection.unshieldedTxCount)}
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
                                Number(connection.shieldedVolume) +
                                    Number(connection.unshieldedVolume)
                            )}
                        </Parameter>
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
            <div
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-6',
                    'rounded-lg p-6 backdrop-blur-lg',
                    props.connectionPanelClassName
                )}
            >
                {pairs.map((pair, i) => (
                    <div key={i} className="flex items-center">
                        <div
                            className={classNames(
                                'border-success-light',
                                'before:border-other-tonalStroke relative flex',
                                'h-10 w-10 items-center justify-center',
                                'rounded-full border-1 before:absolute',
                                'before:-z-1 before:h-[calc(100%+4px)]',
                                'before:w-[calc(100%+4px)] before:rounded-full',
                                'before:border-3'
                            )}
                        >
                            <Image
                                alt="Penumbra"
                                height={32}
                                src="/penumbra.png"
                                width={32}
                            />
                        </div>
                        <div
                            className={classNames(
                                'bg-other-tonalFill10 flex h-7 items-center',
                                'justify-center rounded-full px-1.5 font-mono',
                                'text-xs font-medium backdrop-blur-lg'
                            )}
                        >
                            {pair.channelId}
                        </div>
                        <div
                            className={classNames(
                                'bg-success-light border-other-tonalStroke h-0.5',
                                'flex-1 border-1'
                            )}
                        />
                        <div
                            className={classNames(
                                'bg-other-tonalFill10 relative flex h-8 w-8',
                                'items-center justify-center rounded-full'
                            )}
                        >
                            <CheckIcon
                                className="text-success-light"
                                size={16}
                            />
                            <span
                                className={classNames(
                                    'text-success-light absolute top-8 font-mono text-sm font-medium'
                                )}
                            >
                                Open
                            </span>
                        </div>
                        <div
                            className={classNames(
                                'bg-success-light border-other-tonalStroke h-0.5',
                                'flex-1 border-1'
                            )}
                        />
                        <div
                            className={classNames(
                                'bg-other-tonalFill10 flex h-7 items-center',
                                'justify-center rounded-full px-1.5 font-mono',
                                'text-xs font-medium backdrop-blur-lg'
                            )}
                        >
                            {pair.counterpartyChannelId}
                        </div>
                        <div
                            className={classNames(
                                'border-success-light',
                                'before:border-other-tonalStroke relative flex',
                                'h-10 w-10 items-center justify-center',
                                'rounded-full border-1 before:absolute',
                                'before:-z-1 before:h-[calc(100%+4px)]',
                                'before:w-[calc(100%+4px)] before:rounded-full',
                                'before:border-3'
                            )}
                        >
                            <Image
                                alt={props.name}
                                height={32}
                                src={props.image}
                                width={32}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ChainLoader
