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
            <div className="grid grid-cols-12 items-start gap-4">
                <ProposalPanelContainer className="col-span-full" />
                <ProposalTableContainer
                    className={classNames(
                        'col-span-full flex flex-col gap-6 p-6 lg:col-span-8',
                        'xl:col-span-9'
                    )}
                    header={
                        <h1 className="text-2xl font-medium">Past proposals</h1>
                    }
                    limit={{ length, offset }}
                    pagination
                />
                <GovernanceParametersContainer
                    className={classNames(
                        'col-span-full lg:col-span-4 xl:col-span-3'
                    )}
                />
            </div>
        </Container>
    )
}

export default GovernancePage
