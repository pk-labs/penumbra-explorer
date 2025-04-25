'use client'

import { FC, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { classNames, decodeTransaction, transactionToView } from '@/lib/utils'
import PenumbraAction from '../penumbraAction'
import Subsection from '../subsection'

interface Props {
    blockHeight: number
    chainId: string
    hash: string
    rawTransaction: string
}

const Actions: FC<Props> = props => {
    const view = useMemo(() => {
        const transaction = decodeTransaction(props.rawTransaction)
        return transactionToView(transaction, props.hash, props.blockHeight)
    }, [props.blockHeight, props.hash, props.rawTransaction])

    const actionViews = view?.bodyView?.actionViews

    if (!actionViews?.length) {
        return
    }

    return (
        <Subsection title="Actions">
            <ul className="flex flex-col gap-2">
                {actionViews.map((action, i) => (
                    <li
                        key={i}
                        className={classNames(
                            'relative before:absolute before:top-full',
                            'before:left-5 before:h-2 before:w-[1px]',
                            'before:bg-other-tonalStroke last:before:hidden'
                        )}
                    >
                        <ErrorBoundary
                            fallback={
                                <div
                                    className={classNames(
                                        'bg-other-tonalFill5 flex h-10 w-full',
                                        'items-center justify-between gap-1',
                                        'rounded-sm px-3 py-2 font-mono'
                                    )}
                                >
                                    <span className="truncate">
                                        {action.actionView.case}
                                    </span>
                                    <span className="text-text-secondary truncate">
                                        Unimplemented
                                    </span>
                                </div>
                            }
                        >
                            <PenumbraAction
                                action={action}
                                chainId={props.chainId}
                            />
                        </ErrorBoundary>
                    </li>
                ))}
            </ul>
        </Subsection>
    )
}

export default Actions
