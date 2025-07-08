'use client'

import { FC } from 'react'
import { NumberCountup } from '@/components'
import { TransformedVoting, VotingState } from '@/lib/types'

interface Props extends Omit<TransformedVoting, 'state'> {
    state?: VotingState
}

const VotingNumbers: FC<Props> = props => {
    const total = props.yes + props.no

    return (
        <div className="flex gap-10">
            <div className="flex-col">
                <div className="font-mono text-xs font-medium">Total votes</div>
                <NumberCountup className="gap-2" number={total} suffix="UM" />
                {props.state === VotingState.InProgress && (
                    <div className="text-destructive-light font-mono text-xs font-medium">
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
    )
}

export default VotingNumbers
