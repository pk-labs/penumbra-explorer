// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import {
    GovernanceParametersContainer,
    ProposalPanelContainer,
    ProposalTableContainer,
} from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'

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
    const offset = page * length

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>Governance</Breadcrumb>
            </Breadcrumbs>
            <ProposalPanelContainer />
            <div
                className={classNames(
                    'mt-4 flex flex-col-reverse gap-4 lg:flex-row',
                    'lg:items-start'
                )}
            >
                <ProposalTableContainer
                    className="min-w-0 flex-1"
                    header={
                        <h1 className="text-2xl font-medium">Past proposals</h1>
                    }
                    limit={{ length, offset }}
                    pagination
                />
                <GovernanceParametersContainer className="lg:w-[370px]" />
            </div>
        </Container>
    )
}

export default GovernancePage
