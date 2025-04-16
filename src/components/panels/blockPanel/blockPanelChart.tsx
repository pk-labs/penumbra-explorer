'use client'

import { FC, useEffect, useRef } from 'react'
import { classNames } from '@/lib/utils'
import styles from './blockPanel.module.css'

const barCount = 24
const animationDuration = 1500

const BlockPanelChart: FC = () => {
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartRef.current) {
            return
        }

        const animationTick = animationDuration / 2 / barCount
        let animationDirection = 1
        let activeBarIndex = 0

        const bars = chartRef.current.children
        bars[activeBarIndex].classList.add(styles.active)

        const interval = setInterval(() => {
            bars[activeBarIndex].classList.remove(styles.active)
            activeBarIndex += animationDirection
            bars[activeBarIndex].classList.add(styles.active)

            if (activeBarIndex === barCount - 1) {
                animationDirection = -1
            } else if (activeBarIndex === 0) {
                animationDirection = 1
            }
        }, animationTick)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <div ref={chartRef} className="flex gap-1">
                {Array.from({ length: barCount }).map((_, i) => (
                    <div
                        key={i}
                        className={classNames(
                            'bg-other-tonalFill10 h-9 w-1 rounded-xs',
                            'transition-all duration-60 xl:h-10',
                            'xl:w-[4.5px]',
                            styles.bar
                        )}
                    />
                ))}
            </div>
            <div>Waiting for next block ...</div>
        </div>
    )
}

export default BlockPanelChart
