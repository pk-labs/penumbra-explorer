'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { classNames } from '@/lib/utils'
import styles from './blockPanel.module.css'

const barCount = 25
const upcomingCountdown = 5
const syncTimeout = 30 * 1000

export enum SyncState {
    Syncing,
    Upcoming,
    Late,
    NotSynced,
}

interface Props {
    blockHeight?: number
    reindexing?: boolean
}

const BlockPanelChart: FC<Props> = props => {
    const barsRef = useRef<HTMLDivElement>(null)
    const cubeRef = useRef<HTMLDivElement>(null)
    const syncTimeoutRef = useRef<NodeJS.Timeout>(null)
    const lateTimeoutRef = useRef<NodeJS.Timeout>(null)
    const [blockHeight, setBlockHeight] = useState(props.blockHeight)
    const [syncState, setSyncState] = useState(SyncState.Syncing)
    const [counter, setCounter] = useState<number>()

    const resetTimeouts = useCallback(() => {
        if (syncTimeoutRef.current) {
            clearTimeout(syncTimeoutRef.current)
            syncTimeoutRef.current = null
        }

        if (lateTimeoutRef.current) {
            clearTimeout(lateTimeoutRef.current)
            lateTimeoutRef.current = null
        }
    }, [])

    const resetBars = useCallback(() => {
        if (barsRef.current) {
            const bars = Array.from(barsRef.current.children)

            bars.forEach(bar =>
                bar.classList.remove(styles.fullBar, styles.animatedBar)
            )
        }
    }, [])

    const resetCube = useCallback(() => {
        if (cubeRef.current) {
            cubeRef.current.classList.remove(
                styles.rotateInfinite,
                styles.rotateFirstHalf,
                styles.rotateSecondHalf
            )
        }
    }, [])

    useEffect(() => {
        if (
            ![SyncState.Syncing, SyncState.Late].includes(syncState) ||
            props.reindexing
        ) {
            return
        }

        syncTimeoutRef.current = setTimeout(() => {
            resetBars()
            resetCube()
            setSyncState(SyncState.NotSynced)
        }, syncTimeout)

        return resetTimeouts
    }, [props.reindexing, resetBars, resetCube, resetTimeouts, syncState])

    useEffect(() => {
        if (cubeRef.current && props.reindexing) {
            resetTimeouts()
            resetBars()
            resetCube()
            cubeRef.current.classList.add(styles.rotateInfinite)
            setSyncState(SyncState.Syncing)
        }
    }, [props.reindexing, resetBars, resetCube, resetTimeouts])

    useEffect(() => {
        if (
            !barsRef.current ||
            !cubeRef.current ||
            !props.blockHeight ||
            props.reindexing
        ) {
            return
        }

        if (syncState === SyncState.Syncing && blockHeight) {
            cubeRef.current.classList.add(styles.rotateInfinite)
            setCounter(upcomingCountdown)
            setSyncState(SyncState.Upcoming)
        } else if (props.blockHeight !== blockHeight) {
            resetTimeouts()
            resetBars()
            resetCube()
            setBlockHeight(props.blockHeight)
            setCounter(upcomingCountdown)
            setSyncState(SyncState.Upcoming)
        }
    }, [
        blockHeight,
        props.blockHeight,
        props.reindexing,
        resetBars,
        resetCube,
        resetTimeouts,
        syncState,
    ])

    useEffect(() => {
        if (
            !barsRef.current ||
            !cubeRef.current ||
            syncState !== SyncState.Upcoming
        ) {
            return
        }

        const bars = Array.from(barsRef.current.children)
        const barsPerSecond = barCount / upcomingCountdown

        const cube = cubeRef.current

        const interval = setInterval(() => {
            setCounter(prev => prev && prev - 1)

            bars.filter(bar =>
                bar.classList.contains(styles.animatedBar)
            ).forEach(bar => {
                bar.classList.add(styles.fullBar)
                bar.classList.remove(styles.animatedBar)
            })

            bars.filter(bar => !bar.classList.contains(styles.fullBar))
                .slice(0, barsPerSecond)
                .forEach((bar, i) => {
                    bar.classList.add(styles.animatedBar)

                    if (i) {
                        bar.classList.add(styles[`delayed${i}`])
                    }
                })

            cube.classList.remove(styles.rotateInfinite)

            if (cube.classList.contains(styles.rotateSecondHalf)) {
                cube.classList.remove(styles.rotateSecondHalf)
                cube.classList.add(styles.rotateFirstHalf)
            } else if (cube.classList.contains(styles.rotateFirstHalf)) {
                cube.classList.remove(styles.rotateFirstHalf)
                cube.classList.add(styles.rotateSecondHalf)
            } else {
                cube.classList.add(styles.rotateFirstHalf)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [syncState, props, resetCube])

    useEffect(() => {
        if (syncState !== SyncState.Upcoming || counter !== 0) {
            return
        }

        lateTimeoutRef.current = setTimeout(() => {
            resetCube()
            cubeRef.current?.classList.add(styles.rotateInfinite)
            setCounter(1)
            setSyncState(SyncState.Late)
        }, 1000)

        return resetTimeouts
    }, [counter, resetCube, resetTimeouts, syncState])

    useEffect(() => {
        if (syncState !== SyncState.Late) {
            return
        }

        const interval = setInterval(
            () => setCounter(prev => prev && prev + 1),
            1000
        )

        return () => {
            clearInterval(interval)
        }
    }, [syncState])

    let message
    let color

    switch (syncState) {
        case SyncState.Upcoming:
            message = `Next block in ~${counter}s`
            color = 'text-primary'
            break
        case SyncState.Late:
            message = `Next block late by ~${counter}s`
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
                ref={barsRef}
                className="flex justify-between sm:justify-start sm:gap-1"
            >
                {Array.from({ length: barCount }).map((_, i) => (
                    <div
                        key={i}
                        className={classNames(
                            'bg-other-tonal-fill10 h-2.5 w-1.25 rounded-xs',
                            'sm:h-9 sm:w-1 xl:h-10! xl:w-1.25!'
                        )}
                    />
                ))}
            </div>
            <div className="flex items-center justify-end gap-1.5">
                <div
                    ref={cubeRef}
                    className={classNames(
                        'relative h-2.5 w-2.5 scale-75 transform-3d',
                        'sm:scale-80 xl:scale-85!',
                        styles.cube
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
