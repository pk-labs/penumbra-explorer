// istanbul ignore file
import { FC } from 'react'
import { Surface, VotingStatePill } from '@/components'
import { getVoting } from '@/lib/data'
import { classNames } from '@/lib/utils'
import { Props } from './votingContainer'
import VotingNumbers from './votingNumbers'

const VotingLoader: FC<Props> = async ({ proposalId, ...props }) => {
    const voting = await getVoting(proposalId)

    if (!voting) {
        return
    }

    return (
        <Surface
            as="section"
            className={classNames('flex flex-col gap-4 p-6', props.className)}
        >
            <VotingStatePill state={voting.state} />
            <VotingNumbers
                abstain={voting.abstain}
                no={voting.no}
                quorum={voting.quorum}
                yes={voting.yes}
            />
        </Surface>
    )
}

export default VotingLoader
