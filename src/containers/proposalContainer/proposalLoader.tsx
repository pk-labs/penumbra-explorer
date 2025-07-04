// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Button, Surface } from '@/components'
import { ProposalState } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props } from './proposalContainer'

const ProposalLoader: FC<Props> = async props => {
    const proposal = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve({
                    description: faker.lorem.paragraphs(3),
                    id: props.proposalId,
                    state: faker.helpers.arrayElement(
                        Object.values(ProposalState)
                    ),
                    title: faker.lorem.sentence({ max: 20, min: 5 }),
                    type: faker.helpers.arrayElement([
                        'Unfreeze IBC Client',
                        'Emergency',
                        'Parameter change',
                        'Upgrade plan',
                    ]),
                }),
            faker.number.int({ max: 3000, min: 2000 })
        )
    )

    return (
        <Surface
            as="section"
            className={classNames('flex flex-col gap-6 p-6', props.className)}
        >
            <header className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <span className="font-mono text-base">
                        Proposal #{proposal.id}
                    </span>
                    <Button
                        density="compact"
                        href="https://guide.penumbra.zone/overview/gov"
                    >
                        void.vote
                    </Button>
                </div>
                <h1 className="text-2xl font-medium">{proposal.title}</h1>
                <div className="text-text-secondary text-xs">
                    {proposal.type}
                </div>
            </header>
            {proposal.description
                .split('\n')
                .map((paragraph: string, i: number) => (
                    <p key={i} className="text-sm">
                        {paragraph}
                    </p>
                ))}
        </Surface>
    )
}

export default ProposalLoader
