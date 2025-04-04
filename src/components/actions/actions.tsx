'use client'

import { ActionView } from '@penumbra-zone/ui/ActionView'
import { FC, useCallback, useMemo } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
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

    const fallbackRender = useCallback(
        ({ error }: FallbackProps) => (
            <div
                className={twMerge(
                    'bg-other-tonalFill5 text-destructive-light flex h-10',
                    'items-center rounded-sm px-3 py-2 text-sm'
                )}
            >
                {String(error)}
            </div>
        ),
        []
    )

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
                        <ErrorBoundary fallbackRender={fallbackRender}>
                            <ActionView
                                action={action}
                                getMetadata={getMetadata}
                            />
                        </ErrorBoundary>
                    </li>
                ))}
            </ul>
        </Subsection>
    )
}

export default Actions
