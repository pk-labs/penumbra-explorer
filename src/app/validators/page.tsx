// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import {
    StakedPanelContainer,
    UnbondingPanelContainer,
    ValidatorsPanelContainer,
} from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'

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
        <div className="grid grid-cols-6 gap-4">
            <StakedPanelContainer className="col-span-6 md:col-span-2" />
            <ValidatorsPanelContainer
                className={classNames('col-span-6 sm:col-span-3 md:col-span-2')}
            />
            <UnbondingPanelContainer
                className={classNames('col-span-6 sm:col-span-3 md:col-span-2')}
            />
        </div>
    </Container>
)

export default ValidatorsPage
