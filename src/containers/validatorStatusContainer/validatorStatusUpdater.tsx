// istanbul ignore file
'use client'

import { FC, useState } from 'react'
import { TransformedPartialBlockFragment, ValidatorBlocks } from '@/lib/types'
import { classNames } from '@/lib/utils'
import ValidatorStatusBlocks from './validatorStatusBlocks'
import { Props as ValidatorStatusContainerProps } from './validatorStatusContainer'
import ValidatorStatusLegend from './validatorStatusLegend'

interface Props extends ValidatorStatusContainerProps {
    latestBlocks?: TransformedPartialBlockFragment[]
    validatorBlocks?: ValidatorBlocks
}

const ValidatorStatusUpdater: FC<Props> = props => {
    const [latestBlocks] = useState(props.latestBlocks)
    const [validatorBlocks] = useState(props.validatorBlocks)

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
            // TODO: Maybe extract this nested backdrop-filter workaround to a
            // "Surface" component
            className={classNames(
                'before:bg-other-tonalFill5 relative z-1 flex flex-col gap-6',
                'p-6 before:absolute before:inset-0 before:-z-1',
                'before:rounded-lg before:backdrop-blur-lg',
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
            {validatorBlocks?.length ? (
                <div className="flex flex-col gap-2">
                    <ValidatorStatusLegend
                        lastBlock={
                            latestBlocks?.length
                                ? latestBlocks[0].height
                                : undefined
                        }
                    />
                    {latestBlocks && (
                        <ValidatorStatusBlocks
                            latestBlocks={latestBlocks}
                            validatorBlocks={validatorBlocks}
                        />
                    )}
                </div>
            ) : (
                <div
                    className={classNames(
                        'text-text-secondary flex h-25 items-center',
                        'justify-center text-sm'
                    )}
                >
                    No signing activity
                </div>
            )}
        </section>
    )
}

export default ValidatorStatusUpdater
