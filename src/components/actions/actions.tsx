'use client'

import { ActionView } from '@penumbra-zone/ui/ActionView'
import { FC, useMemo } from 'react'
import { decodeTransaction, transactionToView } from '@/lib/utils'
import Subsection from '../subsection'

interface Props {
    blockHeight: number
    hash: string
    rawTransaction: string
}

const Actions: FC<Props> = props => {
    const view = useMemo(() => {
        const transaction = decodeTransaction(props.rawTransaction)
        return transactionToView(transaction, props.hash, props.blockHeight)
    }, [props.blockHeight, props.hash, props.rawTransaction])

    return (
        <Subsection title="Actions">
            <ul className="flex flex-col gap-2">
                {view?.bodyView?.actionViews.map((action, i) => (
                    <li key={i}>
                        <ActionView action={action} />
                    </li>
                ))}
            </ul>
        </Subsection>
    )
}

export default Actions
