// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import VotingLoader from './votingLoader'

export interface Props {
    className?: string
}

const VotingContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'flex flex-col gap-6 p-6',
                    props.className
                )}
            >
                <Skeleton className="h-50 rounded-sm" />
            </Surface>
        }
    >
        <VotingLoader {...props} />
    </Suspense>
)

export default VotingContainer
