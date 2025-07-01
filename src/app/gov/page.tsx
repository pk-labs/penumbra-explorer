// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container, Panel } from '@/components'
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
    const _offset = page * length

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>Governance</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 gap-4">
                <Panel className="col-span-full" title="Proposal" />
                <section
                    className={classNames(
                        'bg-other-tonalFill5 col-span-9 flex flex-col gap-2',
                        'rounded-lg p-6 backdrop-blur-lg'
                    )}
                >
                    Past proposals
                </section>
                <Panel className="col-span-3" title="Governance parameters" />
            </div>
        </Container>
    )
}

export default GovernancePage
