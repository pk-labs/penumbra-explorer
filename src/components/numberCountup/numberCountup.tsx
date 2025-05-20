'use client'

import { motion, useAnimate, useMotionValue, useTransform } from 'motion/react'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { classNames, formatNumber } from '@/lib/utils'

export interface Props {
    className?: string
    number: number
    prefix?: ReactNode
    suffix?: ReactNode
}

const NumberCountup: FC<Props> = props => {
    const [scope, animate] = useAnimate()
    const [animated, setAnimated] = useState(true)
    const motionValue = useMotionValue(0)

    const transformValue = useCallback(
        (value: number) => formatNumber(Math.round(value)),
        []
    )

    const transformedValue = useTransform(motionValue, transformValue)

    useEffect(() => {
        const animation = animate(motionValue, props.number, {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        })

        animation.finished.then(() => setAnimated(false))

        return () => animation.stop()
    }, [animate, motionValue, props.number])

    return (
        <span
            className={classNames(
                'inline-flex items-center gap-2 font-mono text-3xl font-medium',
                props.className
            )}
        >
            {props.prefix}
            {animated ? (
                <motion.span ref={scope}>{transformedValue}</motion.span>
            ) : (
                <span>{transformValue(props.number)}</span>
            )}
            {props.suffix}
        </span>
    )
}

export default NumberCountup
