// istanbul ignore file
import { BoxIcon } from 'lucide-react'
import { FC } from 'react'
import { NumberPanel } from '@/components'
import { getVotingEnd } from '@/lib/data'
import dayjs from '@/lib/dayjs/dayjs'
import { Props } from './votingEndPanelContainer'

const VotingEndPanelLoader: FC<Props> = async ({ proposalId, ...props }) => {
    const votingEnd = await getVotingEnd(proposalId)

    if (!votingEnd) {
        return
    }

    return (
        <NumberPanel
            className={props.className}
            number={votingEnd.blockHeight}
            numberClassName="gap-2"
            numberPrefix={<BoxIcon className="text-text-secondary" size={16} />}
            title="Voting ends"
        >
            <div className="text-text-secondary font-mono text-base">
                {dayjs(votingEnd.timestamp)
                    .tz('UTC')
                    .format('YYYY-MM-DD HH:mm:ss z')}
            </div>
        </NumberPanel>
    )
}

export default VotingEndPanelLoader
