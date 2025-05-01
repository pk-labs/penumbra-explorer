// istanbul ignore file
import { CheckIcon } from 'lucide-react'
import Image from 'next/image'
import { FC, Suspense } from 'react'
import { Parameter, Parameters, Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ChainLoader, { Props } from './chainLoader'

const ChainContainer: FC<Props> = props => (
    <Suspense
        fallback={
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
                            'font-heading flex items-center gap-2 text-4xl',
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
                            'flex flex-col gap-1 font-mono text-sm font-medium',
                            props.connectionPanelClassName
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
                                    <Skeleton className="h-4 w-24" />
                                </Parameter>
                                <Parameter name="Txs shielded">
                                    <Skeleton className="h-4 w-24" />
                                </Parameter>
                            </Parameters>
                            <Parameters
                                className="bg-transparent p-0"
                                title="Unshielded"
                            >
                                <Parameter name="Volume unshielded">
                                    <Skeleton className="h-4 w-24" />
                                </Parameter>
                                <Parameter name="Txs unshielded">
                                    <Skeleton className="h-4 w-24" />
                                </Parameter>
                            </Parameters>
                        </div>
                        <Parameters
                            className="bg-transparent p-0 sm:col-2 lg:col-auto!"
                            title="Total"
                        >
                            <Parameter name="Volume total">
                                <Skeleton className="h-4 w-24" />
                            </Parameter>
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
                        'bg-other-tonalFill5 flex h-[106px] items-center',
                        'rounded-lg p-6 backdrop-blur-lg',
                        props.connectionPanelClassName
                    )}
                >
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
                            src={props.image}
                            width={32}
                        />
                    </div>
                    <Skeleton className="h-7 w-18 rounded-full" />
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
                        <CheckIcon className="text-success-light" size={16} />
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
                    <Skeleton className="h-7 w-18 rounded-full" />
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
            </>
        }
    >
        <ChainLoader {...props} />
    </Suspense>
)

export default ChainContainer
