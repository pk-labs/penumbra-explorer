// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import VotingLoader from './votingLoader'
import VotingNumbers from './votingNumbers'

export interface Props {
    className?: string
    proposalId: number
}

const VotingContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'flex flex-col gap-4 p-6',
                    props.className
                )}
            >
                <Skeleton className="h-8 w-42 rounded-full" />
                <VotingNumbers
                    abstain={0}
                    abstainPercentage={0}
                    no={0}
                    noPercentage={0}
                    quorum={0}
                    total={0}
                    yes={0}
                    yesPercentage={0}
                />
            </Surface>
        }
    >
        <VotingLoader {...props} />
    </Suspense>
)

export default VotingContainer
