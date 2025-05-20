// istanbul ignore file
'use client'

import { FC, useEffect, useRef } from 'react'
import { classNames } from '@/lib/utils'
import styles from './blockPanel.module.css'

const barCount = 24
const animationDuration = 3000

interface Props {
    animate?: boolean
}

const BlockPanelChart: FC<Props> = props => {
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartRef.current || !props.animate) {
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
    }, [props.animate])

    return (
        <div className="flex flex-col gap-4 sm:gap-2">
            <div
                ref={chartRef}
                className="flex justify-between sm:justify-start sm:gap-1"
            >
                {Array.from({ length: barCount }).map((_, i) => (
                    <div
                        key={i}
                        className={classNames(
                            'bg-other-tonalFill10 h-2.5 w-1.25 rounded-xs',
                            'transition-all duration-120 sm:h-9 sm:w-1 xl:h-10!',
                            'xl:w-1.25!',
                            styles.bar
                        )}
                    />
                ))}
            </div>
            <div className="flex items-center justify-end gap-1.5">
                <div
                    className={classNames(
                        'relative h-2.5 w-2.5 scale-75 transform-3d',
                        'sm:scale-80 xl:scale-85!',
                        styles.cube,
                        props.animate && styles.animated
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
                <div
                    className={classNames(
                        'text-text-secondary self-end font-mono text-xs',
                        'font-medium'
                    )}
                >
                    Receiving new blocks ...
                </div>
            </div>
        </div>
    )
}

export default BlockPanelChart
