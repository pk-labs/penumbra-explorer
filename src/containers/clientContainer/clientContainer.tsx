// istanbul ignore file
import { FC, Suspense } from 'react'
import { ClientImage, Parameter, Parameters, Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ClientLoader, { Props } from './clientLoader'

const ClientContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <>
                <div
                    className={classNames(
                        'bg-other-tonalFill5 flex flex-col gap-4 rounded-lg',
                        'p-6 backdrop-blur-lg',
                        props.statsClassName
                    )}
                >
                    <h1
                        className={classNames(
                            'font-heading flex items-center gap-2 text-2xl',
                            'font-medium'
                        )}
                    >
                        <ClientImage alt={props.name} src={props.image} />
                        <span className="truncate">{props.name}</span>
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
                            <span>{props.chainId}</span>
                        </div>
                        <div>
                            <span className="text-text-secondary">
                                client-id{' '}
                            </span>
                            <span>{props.id}</span>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-4">
                            <Parameters
                                className="bg-transparent p-0"
                                title="Shielded"
                            >
                                <Parameter name="Txs shielded">
                                    <Skeleton className="h-4 w-24" />
                                </Parameter>
                            </Parameters>
                            <Parameters
                                className="bg-transparent p-0"
                                title="Unshielded"
                            >
                                <Parameter name="Txs unshielded">
                                    <Skeleton className="h-4 w-24" />
                                </Parameter>
                            </Parameters>
                        </div>
                        <Parameters
                            className="bg-transparent p-0 sm:col-2 lg:col-auto!"
                            title="Total"
                        >
                            <Parameter name="Txs total">
                                <Skeleton className="h-4 w-24" />
                            </Parameter>
                            <Parameter name="Txs pending">
                                <Skeleton className="h-4 w-24" />
                            </Parameter>
                            <Parameter name="Txs expired">
                                <Skeleton className="h-4 w-24" />
                            </Parameter>
                        </Parameters>
                    </div>
                </div>
                <div
                    className={classNames(
                        'bg-other-tonalFill5 rounded-lg p-6 backdrop-blur-lg',
                        props.channelsClassName
                    )}
                >
                    <Skeleton className="h-10 w-full" />
                </div>
            </>
        }
    >
        <ClientLoader {...props} />
    </Suspense>
)

export default ClientContainer
