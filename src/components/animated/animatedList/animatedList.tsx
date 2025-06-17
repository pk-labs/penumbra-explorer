'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Children, FC, ReactNode, useEffect, useState } from 'react'
import { useDocumentVisible } from '@/lib/hooks'

interface Props {
    children?: ReactNode
    className?: string
}

const AnimatedList: FC<Props> = props => {
    const documentVisible = useDocumentVisible()
    const [initial, setInitial] = useState(false)

    useEffect(() => setInitial(true), [])

    return (
        <ul className={props.className}>
            <AnimatePresence initial={initial} mode="popLayout">
                {Children.map(props.children, (child, i) => (
                    <motion.li
                        animate={
                            i === 0 &&
                            documentVisible && {
                                opacity: 1,
                                scale: 1,
                            }
                        }
                        exit={{ opacity: 0, scale: 0.8 }}
                        initial={documentVisible && { opacity: 0, scale: 0.8 }}
                        transition={{
                            duration: 0.3,
                            layout: {
                                damping: 30,
                                stiffness: 400,
                                type: 'spring',
                            },
                        }}
                        layout
                    >
                        {child}
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    )
}

export default AnimatedList
