'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import { Tooltip } from '@/components'
import { fastOutSlowIn } from '@/lib/constants'
import { TransformedPartialBlockFragment, ValidatorBlocks } from '@/lib/types'
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
    latestBlocks: TransformedPartialBlockFragment[]
    validatorBlocks: ValidatorBlocks
}

const ValidatorStatusBlocks: FC<Props> = props => (
    <motion.div
        animate="show"
        className={classNames('flex flex-wrap gap-2')}
        initial="hidden"
        variants={containerVariants}
    >
        {props.latestBlocks.map((latestBlock, i) => {
            const validatorBlock = props.validatorBlocks.find(
                block => block.height === latestBlock.height
            )

            const lastBlock = i === props.latestBlocks.length - 1

            return (
                <Fragment key={latestBlock.height}>
                    <Link
                        className={styles.link}
                        href={`/block/${latestBlock.height}`}
                        id={`block-${latestBlock.height}`}
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
                        anchorSelect={`#block-${latestBlock.height}`}
                        className="flex flex-col items-center"
                        open={lastBlock}
                    >
                        Block height
                        <span className="text-sm">
                            {formatNumber(latestBlock.height)}
                        </span>
                    </Tooltip>
                </Fragment>
            )
        })}
    </motion.div>
)

export default ValidatorStatusBlocks
