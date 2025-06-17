'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { FC, MouseEvent, useCallback } from 'react'
import { Tooltip } from '@/components'
import { ValidatorBlock } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import styles from './validatorStatusContainer.module.css'

interface Props {
    validatorBlocks: ValidatorBlock[]
}

const ValidatorStatusBlocks: FC<Props> = props => {
    const onContextMenu = useCallback((e: MouseEvent) => e.preventDefault(), [])

    return (
        <div
            className="flex flex-wrap gap-2 select-none"
            onContextMenu={onContextMenu}
        >
            <AnimatePresence mode="popLayout">
                {props.validatorBlocks.map((block, i) => (
                    <Link
                        key={block.height}
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
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            transition={{
                                duration: 0.3,
                                layout: {
                                    duration: 0.5,
                                },
                            }}
                            viewport={{ once: true }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                transition: { delay: 0.2 + i * 0.0016 },
                            }}
                            layout
                        />
                    </Link>
                ))}
            </AnimatePresence>
            {props.validatorBlocks.map(block => (
                <Tooltip
                    key={block.height}
                    anchorSelect={`#block-${block.height}`}
                    className="flex flex-col items-center"
                >
                    Block height
                    <span className="text-sm">
                        {formatNumber(block.height)}
                    </span>
                </Tooltip>
            ))}
        </div>
    )
}

export default ValidatorStatusBlocks
