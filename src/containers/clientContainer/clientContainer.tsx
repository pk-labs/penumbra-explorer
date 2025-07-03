// istanbul ignore file
import { FC, Suspense } from 'react'
import { Avatar, Parameter, Parameters, Skeleton, Surface } from '@/components'
import { placeholderAvatarImage } from '@/lib/images'
import { classNames } from '@/lib/utils'
import ClientLoader from './clientLoader'

export interface Props {
    chainId?: string
    channelsClassName?: string
    id: string
    image?: string
    name: string
    statsClassName?: string
}

const ClientContainer: FC<Props> = props => (
    <Suspense
        fallback={
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
                            <span className="text-text-secondary">
                                client-id{' '}
                            </span>
                            <span>{props.id}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Parameters>
                            <Parameter name="Last tx time">
                                <Skeleton className="h-4 w-14" />
                            </Parameter>
                        </Parameters>
                        <Parameters>
                            <Parameter name="Txs total">
                                <Skeleton className="h-4 w-14" />
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
                    {/*            <Skeleton className="h-4 w-24" />*/}
                    {/*        </Parameter>*/}
                    {/*    </Parameters>*/}
                    {/*    <Parameters*/}
                    {/*        className="bg-transparent p-0"*/}
                    {/*        title="Unshielded"*/}
                    {/*    >*/}
                    {/*        <Parameter name="Txs unshielded">*/}
                    {/*            <Skeleton className="h-4 w-24" />*/}
                    {/*        </Parameter>*/}
                    {/*    </Parameters>*/}
                    {/*</div>*/}
                    {/*<Parameters*/}
                    {/*    className="bg-transparent p-0 sm:col-2 lg:col-auto!"*/}
                    {/*    title="Total"*/}
                    {/*>*/}
                    {/*    <Parameter name="Txs total">*/}
                    {/*        <Skeleton className="h-4 w-24" />*/}
                    {/*    </Parameter>*/}
                    {/*    <Parameter name="Txs pending">*/}
                    {/*        <Skeleton className="h-4 w-24" />*/}
                    {/*    </Parameter>*/}
                    {/*    <Parameter name="Txs expired">*/}
                    {/*        <Skeleton className="h-4 w-24" />*/}
                    {/*    </Parameter>*/}
                    {/*</Parameters>*/}
                    {/*</div>*/}
                </Surface>
                <Surface className={classNames('p-6', props.channelsClassName)}>
                    <Skeleton className="h-10 w-full" />
                </Surface>
            </>
        }
    >
        <ClientLoader {...props} />
    </Suspense>
)

export default ClientContainer
