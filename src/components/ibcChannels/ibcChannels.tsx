import { CheckIcon } from 'lucide-react'
import { FC } from 'react'
import { penumbra } from '@/lib/images'
import { classNames } from '@/lib/utils'
import ClientImage from '../clientImage'

interface Props {
    channelId: string
    className?: string
    counterpartyChannelId: string
    counterpartyImage?: string
    counterpartyName: string
}

const IbcChannels: FC<Props> = props => (
    <div
        className={classNames(
            'bg-other-tonalFill5 flex items-center rounded-lg p-6',
            'backdrop-blur-lg',
            props.className
        )}
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
                <ClientImage alt="Penumbra" src={penumbra} />
            </div>
            <div
                className={classNames(
                    'bg-other-tonalFill10 flex h-7 items-center',
                    'justify-center rounded-full px-1.5 font-mono',
                    'text-xs font-medium whitespace-nowrap',
                    'backdrop-blur-lg'
                )}
            >
                {props.channelId}
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
                {props.counterpartyChannelId}
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
                <ClientImage
                    alt={props.counterpartyName}
                    src={props.counterpartyImage}
                />
            </div>
        </div>
    </div>
)

export default IbcChannels
