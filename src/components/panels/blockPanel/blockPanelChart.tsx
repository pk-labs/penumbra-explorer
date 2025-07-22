'use client'

import { FC, useEffect, useRef, useState } from 'react'
import styles from './blockPanel.module.css'
import BlockPanelMessage from './blockPanelMessage'

const barCount = 24
const animationDuration = 5000
const animationInterval = animationDuration / barCount

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

        const fillBars = () => {
            const firstEmptyBar = bars.find(
                bar => !bar.classList.contains(styles.full)
            )

            if (firstEmptyBar) {
                firstEmptyBar.classList.add(styles.full)
            } else {
                setSyncState(SyncState.Late)
            }
        }

        const interval = setInterval(fillBars, animationInterval)

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
                blockHeight={props.blockHeight}
                syncState={syncState}
            />
        </div>
    )
}

export default BlockPanelChart
