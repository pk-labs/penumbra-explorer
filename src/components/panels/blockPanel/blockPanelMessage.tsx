import { FC } from 'react'
import { classNames } from '@/lib/utils'
import styles from './blockPanel.module.css'
import { SyncState } from './blockPanelChart'

interface Props {
    blockHeight?: number
    syncState: SyncState
}

const BlockPanelMessage: FC<Props> = props => {
    let message
    let color

    switch (props.syncState) {
        case SyncState.Upcoming:
            message = 'Upcoming block in ...'
            color = 'text-primary'
            break
        case SyncState.Late:
            message = 'Upcoming block late by ...'
            color = 'text-secondary'
            break
        case SyncState.NotSynced:
            message = 'Blocks not synced'
            color = 'caution-light'
            break
        default:
            message = 'Syncing to blocks ...'
            color = 'text-secondary'
            break
    }

    return (
        <div className="flex items-center justify-end gap-1.5">
            <div
                className={classNames(
                    'relative h-2.5 w-2.5 scale-75 transform-3d',
                    'sm:scale-80 xl:scale-85!',
                    styles.cube,
                    props.blockHeight &&
                        [
                            SyncState.Syncing,
                            SyncState.Upcoming,
                            SyncState.Late,
                        ].includes(props.syncState) &&
                        styles.animated
                )}
            >
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className={classNames(
                            `absolute h-full w-full border-${color}`,
                            'border-1 bg-neutral-900',
                            styles.face
                        )}
                    />
                ))}
            </div>
            <div className={`text-${color} self-end font-mono text-xs`}>
                {message}
            </div>
        </div>
    )
}

export default BlockPanelMessage
