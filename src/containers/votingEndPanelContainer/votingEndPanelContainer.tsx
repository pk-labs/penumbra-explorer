// istanbul ignore file
import { BoxIcon } from 'lucide-react'
import { FC, Suspense } from 'react'
import { NumberPanel, Skeleton } from '@/components'
import VotingEndPanelLoader from './votingEndPanelLoader'

export interface Props {
    className?: string
    proposalId: number
}

const VotingEndPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                numberClassName="gap-2"
                numberPrefix={
                    <BoxIcon className="text-text-secondary" size={16} />
                }
                title="Voting ends"
            >
                <Skeleton className="h-6 w-52" />
            </NumberPanel>
        }
    >
        <VotingEndPanelLoader {...props} />
    </Suspense>
)

export default VotingEndPanelContainer
