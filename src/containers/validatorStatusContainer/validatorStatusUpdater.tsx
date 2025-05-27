// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { classNames } from '@/lib/utils'
import { Props as ValidatorStatusContainerProps } from './validatorStatusContainer'

interface Props extends ValidatorStatusContainerProps {
    initialMissedBlocks: number[]
}

const ValidatorStatusUpdater: FC<Props> = ({
    initialMissedBlocks,
    ...props
}) => {
    const [_missedBlocks] = useState(initialMissedBlocks)

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
                <h2 className="text-2xl font-medium">Validator status</h2>
            </header>
        </section>
    )
}

export default ValidatorStatusUpdater
