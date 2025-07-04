// istanbul ignore file
import { BoxIcon } from 'lucide-react'
import { FC, Suspense } from 'react'
import { NumberPanel, Skeleton } from '@/components'
import VotingStartPanelLoader from './votingStartPanelLoader'

export interface Props {
    className?: string
}

const VotingStartPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                numberClassName="gap-2"
                numberPrefix={
                    <BoxIcon className="text-text-secondary" size={16} />
                }
                title="Voting started"
            >
                <Skeleton className="h-6 w-52" />
            </NumberPanel>
        }
    >
        <VotingStartPanelLoader {...props} />
    </Suspense>
)

export default VotingStartPanelContainer
