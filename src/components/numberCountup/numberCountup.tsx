'use client'

import { motion, useAnimate, useMotionValue, useTransform } from 'motion/react'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { fastOutSlowIn } from '@/lib/constants'
import { classNames, formatNumber } from '@/lib/utils'

export interface Props {
    className?: string
    number: number
    prefix?: ReactNode
    suffix?: ReactNode
    toFixed?: number
}

const NumberCountup: FC<Props> = props => {
    const [scope, animate] = useAnimate()
    const [animated, setAnimated] = useState(true)
    const motionValue = useMotionValue(0)

    const transformValue = useCallback(
        (value: number) =>
            formatNumber(
                props.toFixed
                    ? Number(value.toFixed(props.toFixed))
                    : Math.round(value)
            ),
        [props.toFixed]
    )

    const transformedValue = useTransform(motionValue, transformValue)

    useEffect(() => {
        // @ts-expect-error FIXME
        const animation = animate(motionValue, props.number, {
            duration: 0.5,
            ease: fastOutSlowIn,
        })

        animation.finished.then(() => setAnimated(false))

        return () => animation.stop()
    }, [animate, motionValue, props.number])

    return (
        <span
            className={classNames(
                'inline-flex items-center font-mono text-3xl font-medium',
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
