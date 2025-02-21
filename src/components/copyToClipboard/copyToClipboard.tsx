'use client'

import clsx from 'clsx'
import { Copy, LucideProps } from 'lucide-react'
import { FC, MouseEvent, useCallback } from 'react'
import styles from './copyToClipboard.module.css'

interface Props {
    className?: string
    data: string
    iconSize?: LucideProps['size']
}

const CopyToClipboard: FC<Props> = props => {
    const onClick = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation()

            navigator.clipboard
                .writeText(props.data)
                .then(() => alert('Copied to clipboard'))
                .catch(e => {
                    console.error(e)
                    alert('Error copying to clipboard')
                })
        },
        [props.data]
    )

    return (
        <Copy
            className={clsx(styles.root, props.className)}
            onClick={onClick}
            size={props.iconSize}
        />
    )
}

export default CopyToClipboard
