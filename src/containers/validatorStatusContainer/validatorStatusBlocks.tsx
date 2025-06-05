'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import { Tooltip } from '@/components'
import { fastOutSlowIn } from '@/lib/constants'
import { ValidatorBlocks } from '@/lib/types'
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
    latestBlocks: number[]
    validatorBlocks: ValidatorBlocks
}

const ValidatorStatusBlocks: FC<Props> = props => (
    <motion.div
        animate="show"
        className="flex flex-wrap gap-2"
        initial="hidden"
        variants={containerVariants}
    >
        {props.latestBlocks.map(latestBlock => {
            const validatorBlock = props.validatorBlocks.find(
                block => block.height === latestBlock
            )

            return (
                <Fragment key={latestBlock}>
                    <Link
                        className={styles.link}
                        href={`/block/${latestBlock}`}
                        id={`block-${latestBlock}`}
                    >
                        <motion.span
                            className={classNames(
                                styles.block,
                                validatorBlock?.signed && styles.signed,
                                validatorBlock &&
                                    !validatorBlock.signed &&
                                    styles.missed
                            )}
                            variants={blockVariants}
                        />
                    </Link>
                    <Tooltip
                        anchorSelect={`#block-${latestBlock}`}
                        className="flex flex-col items-center"
                    >
                        Block height
                        <span className="text-sm">
                            {formatNumber(latestBlock)}
                        </span>
                    </Tooltip>
                </Fragment>
            )
        })}
    </motion.div>
)

export default ValidatorStatusBlocks
