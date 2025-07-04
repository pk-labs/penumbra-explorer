// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container, Surface } from '@/components'
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
    const { id } = await props.params

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb href="/gov">Governance</Breadcrumb>
            </Breadcrumbs>
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <Surface className="md:w-[350px] lg:w-[380px]! xl:w-[500px]!">
                    Proposal #{id}
                </Surface>
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Surface className="flex-1">Voting started</Surface>
                        <Surface className="flex-1">Voting ends</Surface>
                    </div>
                    <Surface>Vote results</Surface>
                    <Surface>Vote table</Surface>
                </div>
            </div>
        </Container>
    )
}

export default ProposalPage
