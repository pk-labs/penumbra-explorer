'use client'

import clsx from 'clsx'
import { XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { FC, ReactNode } from 'react'
import { fastOutSlowIn } from '@/lib/constants'
import styles from './modal.module.css'

interface Props {
    children?: ReactNode
    className?: string
    onClose?: () => void
    open?: boolean
}

const Modal: FC<Props> = props => (
    <AnimatePresence initial={false}>
        {props.open && (
            <motion.div
                animate={{ opacity: 1 }}
                className={clsx(styles.root, props.className)}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: fastOutSlowIn }}
            >
                {props.onClose && (
                    <button
                        className={styles.closeButton}
                        onClick={props.onClose}
                    >
                        <XIcon size={16} />
                    </button>
                )}
                {props.children}
            </motion.div>
        )}
    </AnimatePresence>
)

export default Modal
