// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container, Surface } from '@/components'
import { classNames, generatePageMetadata } from '@/lib/utils'

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
            <div className="grid grid-cols-12 items-start gap-4">
                <Surface
                    className={classNames(
                        'col-span-12 md:col-span-4 md:row-span-3'
                    )}
                >
                    Proposal #{id}
                </Surface>
                <Surface
                    className={classNames(
                        'col-span-12 sm:col-span-6 md:col-span-4 md:col-start-5'
                    )}
                >
                    Voting started
                </Surface>
                <Surface
                    className={classNames(
                        'col-span-12 sm:col-span-6 md:col-span-4 md:col-start-9'
                    )}
                >
                    Voting ends
                </Surface>
                <Surface
                    className={classNames(
                        'col-span-12 md:col-span-8 md:col-start-5'
                    )}
                >
                    Vote results
                </Surface>
                <Surface
                    className={classNames(
                        'col-span-12 md:col-span-8 md:col-start-5'
                    )}
                >
                    Vote table
                </Surface>
            </div>
        </Container>
    )
}

export default ProposalPage
