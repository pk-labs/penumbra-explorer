'use client'

import {
    CopyToClipboardButton,
    CopyToClipboardButtonProps,
} from '@penumbra-zone/ui/CopyToClipboardButton'
import { FC, MouseEvent, useCallback } from 'react'
import { classNames } from '@/lib/utils'

interface Props extends CopyToClipboardButtonProps {
    className?: string
    small?: boolean
}

const CopyToClipboard: FC<Props> = props => {
    const onClick = useCallback((e: MouseEvent) => {
        e.stopPropagation()
    }, [])

    return (
        <span
            className={classNames(
                'inline-block origin-top-left',
                props.small ? 'h-6 w-6 scale-50' : 'h-8 w-8 scale-[calc(2/3)]',
                props.className
            )}
            onClick={onClick}
        >
            <CopyToClipboardButton text={props.text} />
        </span>
    )
}

export default CopyToClipboard
