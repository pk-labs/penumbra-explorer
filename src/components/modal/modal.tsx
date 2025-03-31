'use client'

import { XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { fastOutSlowIn } from '@/lib/constants'
import Button from '../button'

// TODO: Implement as prop for custom element type
interface Props {
    children?: ReactNode
    className?: string
    closeButton?: boolean
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
                    className={twMerge(
                        'fixed top-0 right-0 bottom-0 left-0 z-30 flex',
                        'items-center justify-center backdrop-blur-sm',
                        'backdrop-brightness-75',
                        props.className
                    )}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    onClick={props.onClose}
                    transition={{ duration: 0.3, ease: fastOutSlowIn }}
                >
                    {props.closeButton && props.onClose && (
                        <Button
                            className="absolute top-4 right-4"
                            density="compact"
                            icon="X"
                            onClick={props.onClose}
                            iconOnly
                        >
                            Close
                        </Button>
                    )}
                    {props.children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
