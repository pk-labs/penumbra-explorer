// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import {
    ProposalContainer,
    VotingContainer,
    VotingEndPanelContainer,
    VotingStartPanelContainer,
    VotingTableContainer,
} from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ id: string }>
}

export const generateMetadata = async (props: Props) => {
    const { id } = await props.params

    return generatePageMetadata(
        `Proposal #${id}`,
        'TODO: Description',
        `/proposal/${id}`
    )
}

const ProposalPage: FC<Props> = async props => {
    const params = await props.params
    const id = Number(params.id)

    if (Number.isNaN(id) || id < 0) {
        notFound()
    }

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb href="/gov">Governance</Breadcrumb>
            </Breadcrumbs>
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <ProposalContainer
                    className="md:w-[350px] lg:w-[380px]! xl:w-[500px]!"
                    proposalId={id}
                />
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <VotingStartPanelContainer className="flex-1" />
                        <VotingEndPanelContainer className="flex-1" />
                    </div>
                    <VotingContainer />
                    <VotingTableContainer />
                </div>
            </div>
        </Container>
    )
}

export default ProposalPage
