'use client'

import { AnimatePresence, motion } from 'motion/react'
import { FC, useCallback, useMemo, useState } from 'react'
import { classNames } from '@/lib/utils'

interface Props {
    className?: string
    minParagraphs: number
    text?: string
}

const ReadMore: FC<Props> = props => {
    const [expanded, setExpanded] = useState(false)

    const paragraphs = useMemo(
        () =>
            props.text
                ?.split('\n')
                .map(paragraph => paragraph.trim())
                .filter(Boolean),
        [props.text]
    )

    const expand = useCallback(() => setExpanded(true), [])

    if (!paragraphs) {
        return
    }

    const visibleParagraphs = paragraphs.slice(0, props.minParagraphs)
    const hiddenParagraphs = paragraphs.slice(props.minParagraphs)

    return (
        <>
            {visibleParagraphs.map((paragraph, i) => (
                <p key={i} className={props.className}>
                    {paragraph}
                </p>
            ))}
            <AnimatePresence>
                {expanded &&
                    hiddenParagraphs.map((paragraph, i) => (
                        <motion.p
                            key={i}
                            animate={{ height: 'auto', opacity: 1 }}
                            className={classNames(
                                'overflow-hidden',
                                props.className
                            )}
                            initial={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {paragraph}
                        </motion.p>
                    ))}
            </AnimatePresence>
            {!expanded && (
                <div>
                    <span
                        className={classNames(
                            'text-primary-light cursor-pointer',
                            props.className
                        )}
                        onClick={expand}
                    >
                        Read more
                    </span>
                </div>
            )}
        </>
    )
}

export default ReadMore
