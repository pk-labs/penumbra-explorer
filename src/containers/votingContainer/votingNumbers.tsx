'use client'

import { motion } from 'motion/react'
import { FC } from 'react'
import { NumberCountup, Skeleton } from '@/components'
import { TransformedVoting, VotingState } from '@/lib/types'
import { classNames } from '@/lib/utils'

interface Props extends Omit<TransformedVoting, 'state'> {
    state?: VotingState
}

const VotingNumbers: FC<Props> = props => (
    <>
        <div className="flex flex-col gap-6 sm:flex-row">
            <div>
                <div className="font-mono text-xs font-medium">Total votes</div>
                <NumberCountup
                    className="gap-2"
                    number={props.total}
                    suffix="UM"
                />
                {props.quorum > 0 ? (
                    <div
                        className={classNames(
                            'font-mono text-xs font-medium',
                            props.total > props.quorum
                                ? 'text-success-light'
                                : 'text-destructive-light'
                        )}
                    >
                        {props.total > props.quorum
                            ? 'Quorum reached'
                            : 'Quorum not reached'}
                    </div>
                ) : (
                    <Skeleton className="h-4 w-32" />
                )}
            </div>
            <div>
                <div className="font-mono text-xs font-medium">
                    Quorum needed
                </div>
                <NumberCountup
                    className="gap-2"
                    number={props.quorum}
                    suffix="UM"
                />
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <NumberCountup
                        className={classNames(
                            'font-default text-success-light text-base',
                            'font-medium'
                        )}
                        number={props.yesPercentage}
                        prefix="Yes&nbsp;"
                        suffix="%"
                        toFixed={2}
                    />
                    <NumberCountup
                        className={classNames('gap-2 text-sm')}
                        number={props.yes}
                        suffix="UM"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <NumberCountup
                        className={classNames(
                            'font-default text-text-secondary',
                            'text-base font-medium'
                        )}
                        number={props.abstainPercentage}
                        prefix="Abstain&nbsp;"
                        suffix="%"
                        toFixed={2}
                    />
                    <NumberCountup
                        className={classNames('gap-2 text-sm')}
                        number={props.abstain}
                        suffix="UM"
                    />
                </div>
                <div className="flex flex-col items-end">
                    <NumberCountup
                        className={classNames(
                            'font-default text-destructive-light',
                            'text-base font-medium'
                        )}
                        number={props.noPercentage}
                        prefix="No&nbsp;"
                        suffix="%"
                        toFixed={2}
                    />
                    <NumberCountup
                        className={classNames('gap-2 text-sm')}
                        number={props.no}
                        suffix="UM"
                    />
                </div>
            </div>
            <div className="bg-other-tonal-fill20 relative h-2 rounded-full">
                <motion.div
                    animate={{ width: `${props.yesPercentage}%` }}
                    className={classNames(
                        'bg-success-light absolute h-full rounded-l-full',
                        props.yesPercentage === 100 && 'rounded-full'
                    )}
                    initial={{ width: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                <motion.div
                    animate={{ width: `${props.noPercentage}%` }}
                    className={classNames(
                        'bg-destructive-light absolute right-0 h-full',
                        'rounded-r-full',
                        props.noPercentage === 100 && 'rounded-full'
                    )}
                    initial={{ width: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>
        </div>
    </>
)

export default VotingNumbers
