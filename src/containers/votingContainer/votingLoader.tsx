// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Surface, VotingStatePill } from '@/components'
import { TransformedVoting, VotingState } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props } from './votingContainer'

const VotingLoader: FC<Props> = async props => {
    const voting = await new Promise<TransformedVoting>(resolve =>
        setTimeout(
            () =>
                resolve({
                    state: faker.helpers.arrayElement(
                        Object.values(VotingState)
                    ),
                }),
            faker.number.int({ max: 3000, min: 2000 })
        )
    )

    return (
        <Surface
            as="section"
            className={classNames('flex flex-col gap-6 p-6', props.className)}
        >
            <VotingStatePill state={voting.state} />
        </Surface>
    )
}

export default VotingLoader
