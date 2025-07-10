// istanbul ignore file
import { faker } from '@faker-js/faker'
import { BoxIcon } from 'lucide-react'
import { FC } from 'react'
import { NumberPanel } from '@/components'
import dayjs from '@/lib/dayjs/dayjs'
import { Props } from './votingEndPanelContainer'

const VotingEndPanelLoader: FC<Props> = async props => {
    const voting = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve({
                    blockHeight: faker.number.int({
                        max: 5999999,
                        min: 5000000,
                    }),
                    timestamp: dayjs()
                        .add(faker.number.int({ max: 60, min: 1 }), 'days')
                        .valueOf(),
                }),
            faker.number.int({ max: 2000, min: 1000 })
        )
    )

    return (
        <NumberPanel
            className={props.className}
            number={voting.blockHeight ?? 0}
            numberClassName="gap-2"
            numberPrefix={<BoxIcon className="text-text-secondary" size={16} />}
            title="Voting ends"
        >
            <div className="text-text-secondary font-mono text-base">
                {dayjs(voting.timestamp)
                    .tz('UTC')
                    .format('YYYY-MM-DD HH:mm:ss z')}
            </div>
        </NumberPanel>
    )
}

export default VotingEndPanelLoader
