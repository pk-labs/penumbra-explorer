// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Surface } from '@/components'
import { classNames } from '@/lib/utils'
import { Props } from './votingTableContainer'

const VotingTableLoader: FC<Props> = async props => {
    const _voting = await new Promise<any>(resolve =>
        setTimeout(
            () => resolve({}),
            faker.number.int({ max: 3000, min: 2000 })
        )
    )

    return (
        <Surface
            as="section"
            className={classNames('flex flex-col gap-6 p-6', props.className)}
        >
            Voting table
        </Surface>
    )
}

export default VotingTableLoader
