import { CheckIcon } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'
import { penumbra } from '@/lib/images'
import { IbcChannelPair } from '@/lib/types'
import { classNames } from '@/lib/utils'

interface Props {
    chainImage: string
    chainName: string
    className?: string
    pairs: IbcChannelPair[]
}

const IbcChannels: FC<Props> = props => (
    <div
        className={classNames(
            'bg-other-tonalFill5 flex flex-col gap-6',
            'rounded-lg p-6 backdrop-blur-lg',
            props.className
        )}
    >
        {props.pairs.map(pair => (
            <div
                key={pair.channelId + pair.counterpartyChannelId}
                className="flex items-center"
            >
                <div className="flex flex-1 items-center">
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
                            className="rounded-full"
                            height={32}
                            src={penumbra}
                            width={32}
                        />
                    </div>
                    <div
                        className={classNames(
                            'bg-other-tonalFill10 flex h-7 items-center',
                            'justify-center rounded-full px-1.5 font-mono',
                            'text-xs font-medium whitespace-nowrap',
                            'backdrop-blur-lg'
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
                </div>
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
                <div className="flex flex-1 items-center">
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
                            'text-xs font-medium whitespace-nowrap',
                            'backdrop-blur-lg'
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
                            alt={props.chainName}
                            className="rounded-full"
                            height={32}
                            src={props.chainImage}
                            width={32}
                        />
                    </div>
                </div>
            </div>
        ))}
    </div>
)

export default IbcChannels
