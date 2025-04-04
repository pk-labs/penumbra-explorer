'use client'

import { ActionView } from '@penumbra-zone/ui/ActionView'
import { FC, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { useGetMetadata } from '@/lib/hooks'
import { decodeTransaction, transactionToView } from '@/lib/utils'
import Subsection from '../subsection'

interface Props {
    blockHeight: number
    chainId: string
    hash: string
    rawTransaction: string
}

const Actions: FC<Props> = props => {
    const getMetadata = useGetMetadata(props.chainId)

    const view = useMemo(() => {
        const transaction = decodeTransaction(props.rawTransaction)
        return transactionToView(transaction, props.hash, props.blockHeight)
    }, [props.blockHeight, props.hash, props.rawTransaction])

    return (
        <Subsection title="Actions">
            <ul className="flex flex-col gap-2">
                {view?.bodyView?.actionViews.map((action, i) => (
                    <li
                        key={i}
                        className={twMerge(
                            'relative before:absolute before:top-full',
                            'before:left-5 before:h-2 before:w-[1px]',
                            'before:bg-other-tonalStroke last:before:hidden'
                        )}
                    >
                        <ActionView action={action} getMetadata={getMetadata} />
                    </li>
                ))}
            </ul>
        </Subsection>
    )
}

export default Actions
