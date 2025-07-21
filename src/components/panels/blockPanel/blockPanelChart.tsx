// istanbul ignore file
'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { classNames } from '@/lib/utils'
import styles from './blockPanel.module.css'

const barCount = 24
const animationDuration = 6000
const animationInterval = animationDuration / barCount
// const animationDuration = 3000

enum SyncState {
    Syncing,
    Upcoming,
    Late,
    NotSynced,
}

interface Props {
    blockHeight?: number
}

const BlockPanelChart: FC<Props> = props => {
    const chartRef = useRef<HTMLDivElement>(null)
    const [syncState, setSyncState] = useState(SyncState.Syncing)

    useEffect(() => {
        if (syncState === SyncState.Syncing && props.blockHeight) {
            setSyncState(SyncState.Upcoming)
        }
    }, [syncState, props.blockHeight])

    useEffect(() => {
        if (!chartRef.current || syncState !== SyncState.Upcoming) {
            return
        }

        const bars = Array.from(chartRef.current.children)

        const animateBars = () => {
            const firstEmptyBar = bars.find(
                bar => !bar.classList.contains(styles.full)
            )

            if (firstEmptyBar) {
                firstEmptyBar.classList.add(styles.full)
            } else {
                setSyncState(SyncState.Late)
            }
        }

        const interval = setInterval(animateBars, animationInterval)

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [syncState, props])

    useEffect(() => {
        if (chartRef.current && syncState === SyncState.Late) {
            const bars = Array.from(chartRef.current.children)

            setTimeout(() => {
                setSyncState(SyncState.NotSynced)
                bars.forEach(element => element.classList.remove(styles.full))
            }, 3000)
        }
    }, [syncState])

    // useEffect(() => {
    //     if (!chartRef.current || !props.animate) {
    //         return
    //     }
    //
    //     let animationFrame: number | undefined
    //     const interval = animationDuration / 2 / barCount
    //     let lastUpdateTime = performance.now()
    //
    //     let animationDirection = 1
    //     let activeBarIndex = 0
    //
    //     const bars = chartRef.current.children
    //     bars[activeBarIndex].classList.add(styles.active)
    //
    //     const animationLoop = (time: DOMHighResTimeStamp) => {
    //         if (time - lastUpdateTime >= interval) {
    //             lastUpdateTime = time
    //
    //             bars[activeBarIndex].classList.remove(styles.active)
    //             activeBarIndex += animationDirection
    //             bars[activeBarIndex].classList.add(styles.active)
    //
    //             if (activeBarIndex === barCount - 1) {
    //                 animationDirection = -1
    //             } else if (activeBarIndex === 0) {
    //                 animationDirection = 1
    //             }
    //         }
    //
    //         animationFrame = requestAnimationFrame(animationLoop)
    //     }
    //
    //     animationFrame = requestAnimationFrame(animationLoop)
    //
    //     return () => {
    //         if (animationFrame) {
    //             cancelAnimationFrame(animationFrame)
    //         }
    //     }
    // }, [props.animate])

    let message
    let color

    switch (syncState) {
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
        <div className="flex flex-col gap-4 sm:gap-2 sm:self-end">
            <div
                ref={chartRef}
                className="flex justify-between sm:justify-start sm:gap-1"
            >
                {Array.from({ length: barCount }).map((_, i) => (
                    <div key={i} className={styles.bar} />
                ))}
            </div>
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
                            ].includes(syncState) &&
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
        </div>
    )
}

export default BlockPanelChart
