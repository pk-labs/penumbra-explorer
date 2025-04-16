'use client'

import { motion, useAnimate, useMotionValue, useTransform } from 'motion/react'
import { FC, useCallback, useEffect, useState } from 'react'
import { classNames, formatNumber } from '@/lib/utils'

export interface Props {
    className?: string
    number: number
    suffix?: string
}

const NumberCountup: FC<Props> = props => {
    const [scope, animate] = useAnimate()
    const [animated, setAnimated] = useState(true)
    const motionValue = useMotionValue(0)

    const transformValue = useCallback(
        (value: number) => {
            return `${formatNumber(Math.round(value))}${props.suffix ?? ''}`
        },
        [props.suffix]
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

    return animated ? (
        <motion.span
            ref={scope}
            className={classNames(
                'font-mono text-3xl font-medium',
                props.className
            )}
        >
            {transformedValue}
        </motion.span>
    ) : (
        <span
            className={classNames(
                'font-mono text-3xl font-medium',
                props.className
            )}
        >
            {transformValue(props.number)}
        </span>
    )
}

export default NumberCountup
