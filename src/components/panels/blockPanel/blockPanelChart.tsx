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

        let animationFrame: number | undefined
        const interval = animationDuration / 2 / barCount
        let lastUpdateTime = performance.now()

        let animationDirection = 1
        let activeBarIndex = 0

        const bars = chartRef.current.children
        bars[activeBarIndex].classList.add(styles.active)

        const animationLoop = (time: DOMHighResTimeStamp) => {
            if (time - lastUpdateTime >= interval) {
                lastUpdateTime = time

                bars[activeBarIndex].classList.remove(styles.active)
                activeBarIndex += animationDirection
                bars[activeBarIndex].classList.add(styles.active)

                if (activeBarIndex === barCount - 1) {
                    animationDirection = -1
                } else if (activeBarIndex === 0) {
                    animationDirection = 1
                }
            }

            animationFrame = requestAnimationFrame(animationLoop)
        }

        animationFrame = requestAnimationFrame(animationLoop)

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <div ref={chartRef} className="flex gap-1">
                {Array.from({ length: barCount }).map((_, i) => (
                    <div
                        key={i}
                        className={classNames(
                            'bg-other-tonalFill10 h-8 w-[3.5px] rounded-xs',
                            'transition-all duration-60 sm:h-9 sm:w-1 xl:h-10',
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
