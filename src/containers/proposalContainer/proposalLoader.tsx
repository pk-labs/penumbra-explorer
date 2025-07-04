// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import {
    Button,
    CopyToClipboard,
    Parameter,
    Parameters,
    Surface,
} from '@/components'
import { ProposalState } from '@/lib/types'
import { classNames, formatNumber } from '@/lib/utils'
import { Props } from './proposalContainer'

const ProposalLoader: FC<Props> = async props => {
    const proposal = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve({
                    depositAmount: faker.number.int({ max: 100, min: 10 }),
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
                        href="https://vote.penumbra.zone/"
                    >
                        Vote
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
            <Parameters className="text-text-primary">
                <Parameter name="Deposit amount">
                    {formatNumber(proposal.depositAmount)} UM
                </Parameter>
            </Parameters>
            <div className="flex flex-col gap-1">
                <h3 className="flex items-center gap-1 text-xs">
                    Payload <CopyToClipboard text={proposal.id} small />
                </h3>
                <div
                    className={classNames(
                        'text-text-secondary bg-other-tonalFill5 rounded-sm',
                        'p-4 font-mono text-sm font-medium break-all'
                    )}
                >
                    {proposal.id}
                </div>
            </div>
        </Surface>
    )
}

export default ProposalLoader
