'use client'

import { motion } from 'motion/react'
import { FC } from 'react'
import { fastOutSlowIn } from '@/lib/constants'
import { TransformedPartialBlockFragment, ValidatorBlocks } from '@/lib/types'
import { classNames } from '@/lib/utils'
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
    validatorBlocks?: ValidatorBlocks
}

const ValidatorStatusBlocks: FC<Props> = props => (
    <motion.div
        animate="show"
        className={classNames('flex flex-wrap gap-2')}
        initial="hidden"
        variants={containerVariants}
    >
        {props.latestBlocks.map(latestBlock => {
            const validatorBlock = props.validatorBlocks?.find(
                block => block.height === latestBlock.height
            )

            return (
                <motion.span
                    key={latestBlock.height}
                    className={classNames(
                        styles.block,
                        validatorBlock?.signed && styles.signed,
                        validatorBlock &&
                            !validatorBlock.signed &&
                            styles.missed
                    )}
                    variants={blockVariants}
                />
            )
        })}
    </motion.div>
)

export default ValidatorStatusBlocks
