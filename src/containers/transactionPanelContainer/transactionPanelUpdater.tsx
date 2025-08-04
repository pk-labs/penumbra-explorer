// istanbul ignore file
'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { useClient } from 'urql'
import { pipe, subscribe } from 'wonka'
import { TransactionPanel } from '@/components'
import { animationFrameMs } from '@/lib/constants'
import {
    TransactionCountUpdateSubscription,
    TransactionCountUpdateSubscriptionVariables,
} from '@/lib/graphql/generated/types'
import transactionCountSubscription from '@/lib/graphql/subscriptions/transactionCountSubscription.graphql'
import { Props as TransactionPanelContainerProps } from './transactionPanelContainer'

interface Props extends TransactionPanelContainerProps {
    number: number
}

const TransactionPanelUpdater: FC<Props> = props => {
    const client = useClient()
    const queueRef = useRef<number[]>([])
    const animationFrameRef = useRef<number>(undefined)
    const updateTimestampRef = useRef(0)
    const [number, setNumber] = useState(props.number)

    useEffect(() => {
        const source = client.subscription<
            TransactionCountUpdateSubscription,
            TransactionCountUpdateSubscriptionVariables
        >(transactionCountSubscription, {})

        const { unsubscribe } = pipe(
            source,
            subscribe(result => {
                const count = result.data?.transactionCount.count

                if (count) {
                    queueRef.current.push(count)
                }
            })
        )

        return () => unsubscribe()
    }, [client])

    useEffect(() => {
        const animationLoop = () => {
            if (queueRef.current.length > 0) {
                const now = performance.now()

                if (now - updateTimestampRef.current >= animationFrameMs) {
                    const count = queueRef.current.shift()

                    if (count) {
                        setNumber(count)
                        updateTimestampRef.current = now
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(animationLoop)
        }

        animationFrameRef.current = requestAnimationFrame(animationLoop)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

    return <TransactionPanel {...props} number={number} />
}

export default TransactionPanelUpdater
