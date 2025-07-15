// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Button,
    JsonTree,
    Parameter,
    Parameters,
    ProposalStatePill,
    ReadMore,
    Surface,
} from '@/components'
import getProposal from '@/lib/data/getProposal'
import { ProposalState } from '@/lib/graphql/generated/types'
import { classNames, formatNumber } from '@/lib/utils'
import { Props } from './proposalContainer'

const ProposalLoader: FC<Props> = async ({ proposalId, ...props }) => {
    const proposal = await getProposal(proposalId)

    if (!proposal) {
        notFound()
    }

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
                    {proposal.state !== ProposalState.Voting ? (
                        <ProposalStatePill state={proposal.state} />
                    ) : (
                        <Button
                            density="compact"
                            href="https://vote.penumbra.zone/"
                        >
                            Vote
                        </Button>
                    )}
                </div>
                <h1 className="text-2xl font-medium">{proposal.title}</h1>
                <div className="text-text-secondary text-xs">
                    {proposal.kind}
                </div>
            </header>
            <ReadMore
                className="text-sm"
                minParagraphs={3}
                text={proposal.description}
            />
            <Parameters>
                <Parameter name="Deposit amount">
                    {formatNumber(proposal.depositAmount)} UM
                </Parameter>
            </Parameters>
            {proposal.rawJson && (
                <JsonTree
                    className="gap-1"
                    data={proposal.rawJson}
                    title="Payload"
                    titleClassName="text-xs"
                />
            )}
        </Surface>
    )
}

export default ProposalLoader
