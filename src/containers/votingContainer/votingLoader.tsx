// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Surface, VotingStatePill } from '@/components'
import { TransformedVoting, VotingState } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props } from './votingContainer'
import VotingNumbers from './votingNumbers'

const VotingLoader: FC<Props> = async props => {
    const voting = await new Promise<TransformedVoting>(resolve =>
        setTimeout(
            () => {
                const quorum = faker.number.int({
                    max: 8000000,
                    min: 4000000,
                })

                const yes = faker.number.int({ max: quorum * 0.9 })
                const no = faker.number.int({ max: quorum - yes })

                return resolve({
                    no,
                    quorum,
                    state: faker.helpers.arrayElement(
                        Object.values(VotingState)
                    ),
                    yes,
                })
            },
            faker.number.int({ max: 3000, min: 2000 })
        )
    )

    return (
        <Surface
            as="section"
            className={classNames('flex flex-col gap-6 p-6', props.className)}
        >
            <VotingStatePill state={voting.state} />
            <VotingNumbers {...voting} />
        </Surface>
    )
}

export default VotingLoader
