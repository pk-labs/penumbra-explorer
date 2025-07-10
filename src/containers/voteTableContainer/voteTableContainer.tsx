// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import VoteTableLoader from './voteTableLoader'

export interface Props {
    className?: string
}

const VoteTableContainer: FC<Props> = props => (
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
        <VoteTableLoader {...props} />
    </Suspense>
)

export default VoteTableContainer
