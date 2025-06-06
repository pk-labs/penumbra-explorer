// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import {
    useBlockUpdateSubscription,
    useValidatorBlockUpdateSubscription,
} from '@/lib/graphql/generated/hooks'
import { ValidatorBlock } from '@/lib/types'
import { classNames } from '@/lib/utils'
import ValidatorStatusBlocks from './validatorStatusBlocks'
import { Props as ValidatorStatusContainerProps } from './validatorStatusContainer'
import ValidatorStatusLegend from './validatorStatusLegend'

interface Props extends ValidatorStatusContainerProps {
    latestBlocks: number[]
    validatorBlocks: ValidatorBlock[]
}

const ValidatorStatusUpdater: FC<Props> = props => {
    const [latestBlocks, setLatestBlocks] = useState(props.latestBlocks)
    const [validatorBlocks, setValidatorBlocks] = useState(
        props.validatorBlocks
    )

    const [blockSubscription] = useBlockUpdateSubscription({
        variables: { limit: 1 },
    })
    const [validatorBlockSubscription] = useValidatorBlockUpdateSubscription({
        variables: { id: props.validatorId },
    })

    const blockUpdate = blockSubscription.data?.latestBlocks
    const validatorBlockUpdate =
        validatorBlockSubscription.data?.validatorBlocks

    useEffect(() => {
        if (blockUpdate) {
            setLatestBlocks(prev =>
                Array.from(new Set([blockUpdate.height, ...prev])).slice(0, 300)
            )
        }
    }, [blockUpdate])

    useEffect(() => {
        if (validatorBlockUpdate) {
            setValidatorBlocks(prev =>
                [
                    {
                        height: validatorBlockUpdate.blockHeight,
                        signed: validatorBlockUpdate.signed,
                    },
                    ...prev,
                ].slice(0, 300)
            )
        }
    }, [validatorBlockUpdate])

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
                            latestBlocks?.length ? latestBlocks[0] : undefined
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
