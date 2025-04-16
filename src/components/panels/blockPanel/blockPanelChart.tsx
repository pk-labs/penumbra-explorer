// istanbul ignore file
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
            <div
                ref={chartRef}
                className="flex justify-between sm:justify-start sm:gap-1"
            >
                {Array.from({ length: barCount }).map((_, i) => (
                    <div
                        key={i}
                        className={classNames(
                            'bg-other-tonalFill10 h-10 w-1.25 rounded-xs',
                            'transition-all duration-60 sm:h-9 sm:w-1 xl:h-10!',
                            'xl:w-1.25!',
                            styles.bar
                        )}
                    />
                ))}
            </div>
            <div className="flex items-center gap-2">
                <div
                    className={classNames(
                        'relative h-2.5 w-2.5 scale-90 transform-3d',
                        'sm:scale-95 xl:scale-none!',
                        styles.cube
                    )}
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className={classNames(
                                'border-text-secondary absolute h-full w-full',
                                'border-1 bg-neutral-900',
                                styles.face
                            )}
                        />
                    ))}
                </div>
                Receiving new blocks ...
            </div>
        </div>
    )
}

export default BlockPanelChart
