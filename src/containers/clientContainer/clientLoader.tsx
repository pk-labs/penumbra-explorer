// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Avatar,
    IbcChannels,
    Parameter,
    Parameters,
    Surface,
    TimeAgo,
} from '@/components'
import { getIbcStats } from '@/lib/data'
import { placeholderAvatarImage } from '@/lib/images'
import { classNames, formatNumber } from '@/lib/utils'
import { Props } from './clientContainer'

const ClientLoader: FC<Props> = async props => {
    const stats = await getIbcStats({ clientId: props.id })

    if (stats?.length !== 1) {
        notFound()
    }

    const [client] = stats

    return (
        <>
            <Surface
                className={classNames(
                    'flex flex-col gap-4 p-6',
                    props.statsClassName
                )}
            >
                <h1
                    className={classNames(
                        'font-heading flex items-center gap-2 text-2xl',
                        'font-medium'
                    )}
                >
                    <Avatar
                        alt={props.name}
                        fallback={placeholderAvatarImage}
                        src={props.image}
                    />
                    <span className="truncate">{props.name}</span>
                </h1>
                <div
                    className={classNames(
                        'flex flex-col gap-1 font-mono text-sm font-medium'
                    )}
                >
                    {props.chainId && (
                        <div>
                            <span className="text-text-secondary">
                                chain-id{' '}
                            </span>
                            <span>{props.chainId}</span>
                        </div>
                    )}
                    <div>
                        <span className="text-text-secondary">client-id </span>
                        <span>{props.id}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Parameters>
                        <Parameter name="Last tx time">
                            <TimeAgo timestamp={client.timestamp} />
                        </Parameter>
                    </Parameters>
                    <Parameters>
                        <Parameter name="Txs total">
                            {formatNumber(client.totalTxCount)}
                        </Parameter>
                    </Parameters>
                </div>
                {/*<div className="grid gap-4">*/}
                {/*<div className="flex flex-col gap-4">*/}
                {/*    <Parameters*/}
                {/*        className="bg-transparent p-0"*/}
                {/*        title="Shielded"*/}
                {/*    >*/}
                {/*        <Parameter name="Txs shielded">*/}
                {/*            {formatNumber(client.shieldedTxCount)}*/}
                {/*        </Parameter>*/}
                {/*    </Parameters>*/}
                {/*    <Parameters*/}
                {/*        className="bg-transparent p-0"*/}
                {/*        title="Unshielded"*/}
                {/*    >*/}
                {/*        <Parameter name="Txs unshielded">*/}
                {/*            {formatNumber(client.unshieldedTxCount)}*/}
                {/*        </Parameter>*/}
                {/*    </Parameters>*/}
                {/*</div>*/}
                {/*<Parameters*/}
                {/*    className="bg-transparent p-0 sm:col-2 lg:col-auto!"*/}
                {/*    // title="Total"*/}
                {/*>*/}
                {/*    <Parameter name="Txs total">*/}
                {/*        {formatNumber(client.totalTxCount)}*/}
                {/*    </Parameter>*/}
                {/*    <Parameter name="Txs pending">*/}
                {/*        {formatNumber(client.pendingTxCount)}*/}
                {/*    </Parameter>*/}
                {/*    <Parameter name="Txs expired">*/}
                {/*        {formatNumber(client.expiredTxCount)}*/}
                {/*    </Parameter>*/}
                {/*</Parameters>*/}
                {/*</div>*/}
            </Surface>
            {client.channelId && client.counterpartyChannelId && (
                <IbcChannels
                    channelId={client.channelId}
                    className={props.channelsClassName}
                    counterpartyChannelId={client.counterpartyChannelId}
                    counterpartyImage={props.image}
                    counterpartyName={props.name}
                />
            )}
        </>
    )
}

export default ClientLoader
