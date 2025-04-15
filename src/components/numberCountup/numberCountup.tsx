'use client'

import { motion, useAnimate, useMotionValue, useTransform } from 'motion/react'
import { FC, useEffect } from 'react'
import { classNames, formatNumber } from '@/lib/utils'

export interface Props {
    className?: string
    number: number
    suffix?: string
}

const NumberCountup: FC<Props> = props => {
    const [scope, animate] = useAnimate()
    const motionValue = useMotionValue(0)

    const transformedValue = useTransform(
        motionValue,
        value => `${formatNumber(Math.round(value))}${props.suffix ?? ''}`
    )

    useEffect(() => {
        const animation = animate(motionValue, props.number, {
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
            // FIXME: Why does this cause a type error for props.number?
            // ease: fastOutSlowIn,
        })

        return () => animation.stop()
    }, [animate, motionValue, props.number])

    return (
        <motion.span
            ref={scope}
            className={classNames(
                'font-mono text-3xl font-medium',
                props.className
            )}
        >
            {transformedValue}
        </motion.span>
    )
}

export default NumberCountup
