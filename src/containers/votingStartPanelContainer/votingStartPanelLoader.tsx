// istanbul ignore file
import { BoxIcon } from 'lucide-react'
import { FC } from 'react'
import { NumberPanel } from '@/components'
import { getVotingStart } from '@/lib/data'
import dayjs from '@/lib/dayjs/dayjs'
import { Props } from './votingStartPanelContainer'

const VotingStartPanelLoader: FC<Props> = async ({ proposalId, ...props }) => {
    const votingStart = await getVotingStart(proposalId)

    if (!votingStart) {
        return
    }

    return (
        <NumberPanel
            className={props.className}
            number={votingStart.blockHeight}
            numberClassName="gap-2"
            numberPrefix={<BoxIcon className="text-text-secondary" size={16} />}
            title="Voting started"
        >
            <div className="text-text-secondary font-mono text-base">
                {dayjs(votingStart.timestamp)
                    .tz('UTC')
                    .format('YYYY-MM-DD HH:mm:ss z')}
            </div>
        </NumberPanel>
    )
}

export default VotingStartPanelLoader
