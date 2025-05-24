// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { LatestTransactionsContainer, ValidatorContainer } from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ validator: string }>
}

export const generateMetadata = async (props: Props) => {
    const { validator } = await props.params

    return generatePageMetadata(
        `${validator} validator`,
        'TODO: Description',
        `/validators/${validator}`
    )
}

const ValidatorPage: FC<Props> = async props => {
    const { validator } = await props.params

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb href="/validators">Validators</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 gap-4">
                <ValidatorContainer
                    className="col-span-12 self-start md:col-span-5 lg:col-span-4"
                    validator={validator}
                />
                <LatestTransactionsContainer
                    className="col-span-12 md:col-span-7 lg:col-span-8"
                    limit={10}
                    blockHeight
                    time
                />
            </div>
        </Container>
    )
}

export default ValidatorPage
