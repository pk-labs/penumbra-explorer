'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { FC, Fragment, MouseEvent, useCallback } from 'react'
import { Tooltip } from '@/components'
import { fastOutSlowIn } from '@/lib/constants'
import { ValidatorBlock } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import styles from './validatorStatusContainer.module.css'

const containerVariants = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.0016,
        },
    },
}

const blockVariants = {
    hidden: { scale: 0 },
    show: {
        scale: [0, 1.2, 1],
        transition: {
            duration: 0.2,
            ease: fastOutSlowIn,
            times: [0, 0.7, 1],
        },
    },
}

interface Props {
    validatorBlocks: ValidatorBlock[]
}

const ValidatorStatusBlocks: FC<Props> = props => {
    const onContextMenu = useCallback((e: MouseEvent) => e.preventDefault(), [])

    return (
        <motion.div
            animate="show"
            className="flex flex-wrap gap-2 select-none"
            initial="hidden"
            onContextMenu={onContextMenu}
            variants={containerVariants}
        >
            {props.validatorBlocks.map(block => (
                <Fragment key={block.height}>
                    <Link
                        className={styles.link}
                        href={`/block/${block.height}`}
                        id={`block-${block.height}`}
                    >
                        <motion.span
                            className={classNames(
                                styles.block,
                                block.signed === true && styles.signed,
                                block.signed === false && styles.missed
                            )}
                            variants={blockVariants}
                        />
                    </Link>
                    <Tooltip
                        anchorSelect={`#block-${block.height}`}
                        className="flex flex-col items-center"
                    >
                        Block height
                        <span className="text-sm">
                            {formatNumber(block.height)}
                        </span>
                    </Tooltip>
                </Fragment>
            ))}
        </motion.div>
    )
}

export default ValidatorStatusBlocks
