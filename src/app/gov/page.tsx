// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container, Surface } from '@/components'
import {
    GovernanceParametersContainer,
    ProposalPanelContainer,
} from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Governance',
    'TODO: Description',
    '/gov'
)

interface Props {
    searchParams: Promise<{
        page?: string
    }>
}

const GovernancePage: FC<Props> = async props => {
    const searchParams = await props.searchParams
    const page = searchParams.page ? Number(searchParams.page) - 1 : 0

    if (Number.isNaN(page) || page < 0) {
        notFound()
    }

    const length = 10
    const _offset = page * length

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>Governance</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 gap-4">
                <ProposalPanelContainer className="col-span-full" />
                <Surface
                    as="section"
                    className="col-span-9 flex flex-col gap-2 p-6"
                >
                    Past proposals
                </Surface>
                <GovernanceParametersContainer className="col-span-3" />
            </div>
        </Container>
    )
}

export default GovernancePage
