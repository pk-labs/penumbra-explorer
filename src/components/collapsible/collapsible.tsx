'use client'

import { ChevronRightIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { FC, ReactNode, useCallback, useState } from 'react'
import { classNames } from '@/lib/utils'

interface Props {
    children?: ReactNode
    className?: string
    contentClassName?: string
    header: ReactNode
    headerClassName?: string
}

const Collapsible: FC<Props> = props => {
    const [expanded, setExpanded] = useState(false)

    const toggle = useCallback(() => setExpanded(prev => !prev), [])

    return (
        <div
            className={classNames(
                'bg-other-tonal-fill5 overflow-hidden rounded-sm',
                props.className
            )}
        >
            <div
                className={classNames(
                    'hover:bg-other-tonal-fill10 relative transition-colors',
                    'flex h-12 cursor-pointer items-center pr-4 pl-10',
                    'duration-200 ease-out select-none',
                    props.headerClassName
                )}
                onClick={toggle}
            >
                <motion.div
                    animate={{ rotate: expanded ? 90 : 0 }}
                    className="absolute left-4"
                    transition={{ duration: 0.2 }}
                >
                    <ChevronRightIcon size={14} />
                </motion.div>
                {props.header}
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        animate={{ height: 'auto' }}
                        className="overflow-hidden"
                        exit={{ height: 0 }}
                        initial={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div
                            className={classNames(
                                'border-t-other-tonal-stroke border-t-1 px-10',
                                'py-6',
                                props.contentClassName
                            )}
                        >
                            {props.children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Collapsible
