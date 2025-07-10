// istanbul ignore file
import { FC, Suspense } from 'react'
import { Avatar, Skeleton, Surface } from '@/components'
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
                    <Skeleton className="h-14 rounded-sm" />
                </Surface>
                <Surface className={classNames('p-6', props.channelsClassName)}>
                    <Skeleton className="h-10 w-full rounded-sm" />
                </Surface>
            </>
        }
    >
        <ClientLoader {...props} />
    </Suspense>
)

export default ClientContainer
