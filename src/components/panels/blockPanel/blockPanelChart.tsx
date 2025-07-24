'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import styles from './blockPanel.module.css'
import BlockPanelMessage from './blockPanelMessage'

const barCount = 24
const upcomingCountdown = 5
const animationDuration = upcomingCountdown * 1000
const syncMinBlockHeight = 100
const syncTimeout = 30

export enum SyncState {
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
    const initialBlock = useRef(true)
    const [blockHeight, setBlockHeight] = useState(props.blockHeight)
    const [syncState, setSyncState] = useState(SyncState.Syncing)
    const [counter, setCounter] = useState<number>()

    const resetBars = useCallback(() => {
        if (chartRef.current) {
            const bars = Array.from(chartRef.current.children)
            bars.forEach(bar => bar.classList.remove(styles.full))
        }
    }, [])

    useEffect(() => {
        if (!chartRef.current || !props.blockHeight) {
            return
        }

        if (syncState === SyncState.Syncing && blockHeight) {
            if (props.blockHeight - blockHeight >= syncMinBlockHeight) {
                return
            } else if (initialBlock.current) {
                initialBlock.current = false
            } else {
                setCounter(upcomingCountdown)
                setSyncState(SyncState.Upcoming)
            }
        } else if (props.blockHeight !== blockHeight) {
            resetBars()
            setBlockHeight(props.blockHeight)
            setCounter(upcomingCountdown)
            setSyncState(SyncState.Upcoming)
        }
    }, [props.blockHeight, blockHeight, syncState, resetBars])

    useEffect(() => {
        if (!chartRef.current || syncState !== SyncState.Upcoming) {
            return
        }

        const bars = Array.from(chartRef.current.children)

        const animationInterval = setInterval(() => {
            if (initialBlock.current) {
                return
            }

            bars.find(
                bar => !bar.classList.contains(styles.full)
            )?.classList.add(styles.full)
        }, animationDuration / barCount)

        const counterInterval = setInterval(
            () => setCounter(prev => prev && prev - 1),
            1000
        )

        return () => {
            clearInterval(animationInterval)
            clearInterval(counterInterval)
        }
    }, [syncState, props])

    useEffect(() => {
        if (syncState !== SyncState.Upcoming || counter !== 0) {
            return
        }

        const timeout = setTimeout(() => {
            setCounter(1)
            setSyncState(SyncState.Late)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [counter, syncState])

    useEffect(() => {
        if (syncState !== SyncState.Late) {
            return
        }

        const counterInterval = setInterval(
            () => setCounter(prev => prev && prev + 1),
            1000
        )

        return () => {
            clearTimeout(counterInterval)
        }
    }, [resetBars, syncState])

    useEffect(() => {
        if (syncState === SyncState.Late && counter && counter > syncTimeout) {
            setSyncState(SyncState.NotSynced)
            resetBars()
        }
    }, [counter, resetBars, syncState])

    // useEffect(() => {
    //     const onVisibilityChange = () => {
    //         if (document.visibilityState === 'visible') {
    //             initialBlock.current = true
    //             setSyncState(SyncState.Syncing)
    //             resetBars()
    //         }
    //     }
    //
    //     document.addEventListener('visibilitychange', onVisibilityChange)
    //
    //     return () => {
    //         document.removeEventListener('visibilitychange', onVisibilityChange)
    //     }
    // }, [resetBars])

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
            <BlockPanelMessage
                blockHeight={blockHeight}
                seconds={counter}
                syncState={syncState}
            />
        </div>
    )
}

export default BlockPanelChart
