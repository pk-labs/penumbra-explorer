// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { classNames } from '@/lib/utils'
import { Props as ValidatorStatusContainerProps } from './validatorStatusContainer'
import ValidatorStatusLegend from './validatorStatusLegend'

interface Props extends ValidatorStatusContainerProps {
    blocks: number[]
    missedBlocks: number[]
}

const ValidatorStatusUpdater: FC<Props> = props => {
    const [blocks] = useState(props.blocks)
    const [_missedBlocks] = useState(props.missedBlocks)

    // const [transactionCountUpdateSubscription] =
    //     useTransactionCountUpdateSubscription()
    //
    // useEffect(() => {
    //     if (transactionCountUpdateSubscription.data?.transactionCount) {
    //         setNumber(
    //             transactionCountUpdateSubscription.data.transactionCount.count
    //         )
    //     }
    // }, [transactionCountUpdateSubscription.data?.transactionCount])

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <header>
                <h2 className="inline text-2xl font-medium">
                    Validator status
                </h2>{' '}
                <span className="text-text-secondary text-xs">
                    (Last 300 blocks)
                </span>
            </header>
            <div className="flex flex-col gap-2">
                <ValidatorStatusLegend lastSignedBlock={blocks[0]} />
            </div>
        </section>
    )
}

export default ValidatorStatusUpdater
