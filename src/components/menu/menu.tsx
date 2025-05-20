'use client'

import { FC, ReactNode, useCallback } from 'react'
import Button from '../button'
import Modal from '../modal'

interface Props {
    children?: ReactNode
    className?: string
    onClose: () => void
    onOpen: () => void
    open: boolean
}

const Menu: FC<Props> = props => {
    const toggle = useCallback(() => {
        if (props.open) {
            props.onClose.call(undefined)
        } else {
            props.onOpen.call(undefined)
        }
    }, [props.onClose, props.onOpen, props.open])

    return (
        <>
            <Button
                className={props.className}
                density="compact"
                icon={props.open ? 'X' : 'Menu'}
                onClick={toggle}
                iconOnly
            >
                Menu
            </Button>
            <Modal
                className="flex-col items-stretch justify-start gap-4 pt-[76px]"
                onClose={props.onClose}
                open={props.open}
            >
                {props.children}
            </Modal>
        </>
    )
}

export default Menu
