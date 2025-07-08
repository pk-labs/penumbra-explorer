'use client'

import { motion } from 'motion/react'
import { FC } from 'react'
import { NumberCountup } from '@/components'
import { TransformedVoting, VotingState } from '@/lib/types'
import { classNames } from '@/lib/utils'

interface Props extends Omit<TransformedVoting, 'state'> {
    state?: VotingState
}

const VotingNumbers: FC<Props> = props => {
    const total = props.yes + props.abstain + props.no
    const yesPercentage = total ? Math.round((100 / total) * props.yes) : 0
    const abstainPercentage = total
        ? Math.round((100 / total) * props.abstain)
        : 0
    const noPercentage = total ? Math.round((100 / total) * props.no) : 0

    return (
        <>
            <div className="flex gap-10">
                <div className="flex-col">
                    <div className="font-mono text-xs font-medium">
                        Total votes
                    </div>
                    <NumberCountup
                        className="gap-2"
                        number={total}
                        suffix="UM"
                    />
                    {props.state === VotingState.InProgress && (
                        <div
                            className={classNames(
                                'text-destructive-light font-mono text-xs',
                                'font-medium'
                            )}
                        >
                            Quorum not reached
                        </div>
                    )}
                </div>
                <div className="flex-col">
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
                            number={yesPercentage}
                            prefix="Yes&nbsp;"
                            suffix="%"
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
                            number={abstainPercentage}
                            prefix="Abstain&nbsp;"
                            suffix="%"
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
                            number={noPercentage}
                            prefix="No&nbsp;"
                            suffix="%"
                        />
                        <NumberCountup
                            className={classNames('gap-2 text-sm')}
                            number={props.no}
                            suffix="UM"
                        />
                    </div>
                </div>
                <div className="bg-other-tonalFill20 relative h-2 rounded-full">
                    <motion.div
                        animate={{ width: `${yesPercentage}%` }}
                        className={classNames(
                            'bg-success-light absolute h-full rounded-l-full'
                        )}
                        initial={{ width: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                    <motion.div
                        animate={{ width: `${noPercentage}%` }}
                        className={classNames(
                            'bg-destructive-light absolute right-0 h-full',
                            'rounded-r-full'
                        )}
                        initial={{ width: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
            </div>
        </>
    )
}

export default VotingNumbers
