// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import {
    ProposalContainer,
    VoteTableContainer,
    VotingContainer,
    VotingEndPanelContainer,
    VotingStartPanelContainer,
} from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ id: string }>
    searchParams: Promise<{ page?: string }>
}

export const generateMetadata = async (props: Props) => {
    const { id } = await props.params

    return generatePageMetadata(
        `Proposal #${id}`,
        'Explore governance proposal votes by validators and delegators on ' +
            'Noctis - a fast, secure, and privacy-focused explorer built for ' +
            'Penumbra blockchain.',
        `/proposal/${id}`
    )
}

const ProposalPage: FC<Props> = async props => {
    const params = await props.params
    const id = Number(params.id)
    const searchParams = await props.searchParams
    const page = searchParams.page ? Number(searchParams.page) - 1 : 0

    if (Number.isNaN(id) || id < 0 || Number.isNaN(page) || page < 0) {
        notFound()
    }

    const length = 20
    const offset = page * length

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
                        <VotingStartPanelContainer
                            className="flex-1"
                            proposalId={id}
                        />
                        <VotingEndPanelContainer
                            className="flex-1"
                            proposalId={id}
                        />
                    </div>
                    <VotingContainer proposalId={id} />
                    <VoteTableContainer
                        limit={{ length, offset }}
                        proposalId={id}
                        pagination
                    />
                </div>
            </div>
        </Container>
    )
}

export default ProposalPage
