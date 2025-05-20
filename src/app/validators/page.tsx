// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { StakedPanelContainer, ValidatorsPanelContainer } from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Validators',
    'TODO: Description',
    '/ibc'
)

const ValidatorsPage: FC = () => (
    <Container>
        <Breadcrumbs>
            <Breadcrumb href="/">Explore</Breadcrumb>
            <Breadcrumb>Validators</Breadcrumb>
        </Breadcrumbs>
        <div className="grid grid-cols-6 gap-2">
            <StakedPanelContainer className="col-span-6 md:col-span-2" />
            <ValidatorsPanelContainer className="col-span-3 md:col-span-2" />
        </div>
    </Container>
)

export default ValidatorsPage
