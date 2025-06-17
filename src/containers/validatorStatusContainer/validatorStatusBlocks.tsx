'use client'

import { AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { FC, MouseEvent, useCallback } from 'react'
import { Tooltip } from '@/components'
import { useDocumentVisible } from '@/lib/hooks'
import { ValidatorBlock } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import AnimatedValidatorBlock from './animatedValidatorBlock'
import styles from './validatorStatusContainer.module.css'

interface Props {
    validatorBlocks: ValidatorBlock[]
}

const ValidatorStatusBlocks: FC<Props> = props => {
    const documentVisible = useDocumentVisible()

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
                        <AnimatedValidatorBlock
                            key={block.height}
                            block={block}
                            documentVisible={documentVisible}
                            index={i}
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
