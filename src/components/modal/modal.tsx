'use client'

import clsx from 'clsx'
import { XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { fastOutSlowIn } from '@/lib/constants'
import styles from './modal.module.css'

interface Props {
    children?: ReactNode
    className?: string
    onClose?: () => void
    open?: boolean
}

const Modal: FC<Props> = props => {
    const pathname = usePathname()
    const prevPathname = useRef<string>(pathname)

    useEffect(() => {
        if (!props.open) {
            return
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                props.onClose?.call(undefined)
            }
        }

        document.addEventListener('keydown', onKeyDown)

        return () => document.removeEventListener('keydown', onKeyDown)
    }, [props.onClose, props.open])

    useEffect(() => {
        if (pathname !== prevPathname.current) {
            prevPathname.current = pathname
            props.onClose?.call(undefined)
        }
    }, [pathname, props.onClose])

    return (
        <AnimatePresence initial={false}>
            {props.open && (
                <motion.div
                    animate={{ opacity: 1 }}
                    className={clsx(styles.root, props.className)}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    onClick={props.onClose}
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
}

export default Modal
