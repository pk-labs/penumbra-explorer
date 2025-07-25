import { CheckIcon } from 'lucide-react'
import { FC } from 'react'
import { penumbraImage, placeholderAvatarImage } from '@/lib/images'
import { classNames } from '@/lib/utils'
import Avatar from '../avatar'
import Surface from '../surface'

interface Props {
    channelId: string
    className?: string
    counterpartyChannelId: string
    counterpartyImage?: string
    counterpartyName: string
}

const IbcChannels: FC<Props> = props => (
    <Surface className={classNames('flex items-center p-6', props.className)}>
        <div className="flex flex-1 items-center">
            <div
                className={classNames(
                    'border-success-light',
                    'before:border-other-tonal-stroke relative flex',
                    'h-10 w-10 items-center justify-center',
                    'rounded-full border-1 before:absolute',
                    'before:-z-1 before:h-[calc(100%+4px)]',
                    'before:w-[calc(100%+4px)] before:rounded-full',
                    'before:border-3'
                )}
            >
                <Avatar alt="Penumbra" src={penumbraImage} />
            </div>
            <div
                className={classNames(
                    'bg-other-tonal-fill10 flex h-7 items-center',
                    'justify-center rounded-full px-1.5 font-mono',
                    'text-xs font-medium whitespace-nowrap',
                    'backdrop-blur-lg'
                )}
            >
                {props.channelId}
            </div>
            <div
                className={classNames(
                    'bg-success-light border-other-tonal-stroke h-0.5',
                    'flex-1 border-1'
                )}
            />
        </div>
        <div
            className={classNames(
                'bg-other-tonal-fill10 relative flex h-8 w-8',
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
                    'bg-success-light border-other-tonal-stroke h-0.5',
                    'flex-1 border-1'
                )}
            />
            <div
                className={classNames(
                    'bg-other-tonal-fill10 flex h-7 items-center',
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
                    'before:border-other-tonal-stroke relative flex',
                    'h-10 w-10 items-center justify-center',
                    'rounded-full border-1 before:absolute',
                    'before:-z-1 before:h-[calc(100%+4px)]',
                    'before:w-[calc(100%+4px)] before:rounded-full',
                    'before:border-3'
                )}
            >
                <Avatar
                    alt={props.counterpartyName}
                    fallback={placeholderAvatarImage}
                    src={props.counterpartyImage}
                />
            </div>
        </div>
    </Surface>
)

export default IbcChannels
